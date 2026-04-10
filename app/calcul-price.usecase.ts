export type ProductsType = "TSHIRT" | "PULL";

export type Product = {
  name: string;
  quantity: number;
  price: number;
};

export type Discount = {
  type: string;
  amount: number
};

export class CalculatePriceUseCase {
  constructor(private reductionGateway: ReductionGateway) { }

  async execute(
    product: Product[],
    code?: string[],
  ) {
    const reduction: Discount[] = [];
    await code?.forEach(async c => {
      reduction.push(await this.reductionGateway.getReductionByCode(c))
    })

    product.forEach((p) => {
      p = this.applyReduction(reduction, p);
    })


    return product.reduce(
      (price, product) => product.price * product.quantity + price,
      0
    );
  }

  private applyReduction(reduction: Discount[], product: Product): any {
    console.error(reduction)
    reduction.forEach(r => {
      switch (r.type) {
        case 'DIRECT_REDUCTION': {
          product.price = product.price - r.amount;
          break;
        }
        case 'PERCENTILE_REDUCTION': {
          product.price = product.price - (product.price * (r.amount / 100))
          break;
        }
        case '2_FOR_1': {
          if (product.quantity % 2 === 0) {
            product.quantity = product.quantity / 2
          } else {
            const tmp = product.quantity - 1;
            product.quantity = 1 + (tmp / 2)
          }
          break;
        }
      }
    })
    if (product.price < 1) {
      product.price = 1
    }
    return product
  }
}

export interface ReductionGateway {
  getReductionByCode(code: string | undefined): Promise<{
    type: string;
    amount: number;
  }>;
}