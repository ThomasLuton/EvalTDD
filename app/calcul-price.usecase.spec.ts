import { beforeEach, describe, expect, test } from "vitest";
import { CalculatePriceUseCase, ReductionGateway } from "./calcul-price.usecase";

class StubReductionGateway implements ReductionGateway {
    reduction = {
        type: "DIRECT_REDUCTION",
        amount: 10
    };
    async getReductionByCode(code: string | undefined): Promise<{
        type: string;
        amount: number;
    }> {
        return this.reduction;
    }
}

describe("CalculatePriceUseCase", () => {
    let reductionGateway: StubReductionGateway;
    let calculatePrice: CalculatePriceUseCase;
    beforeEach(() => {
        reductionGateway = new StubReductionGateway();
        calculatePrice = new CalculatePriceUseCase(reductionGateway);
    });

    test("For one product with direct reduction", async () => {
        const result = await calculatePrice.execute([
            {
                price: 20,
                name: "product1",
                quantity: 1,
            },
        ])
        expect(result).toBe(10);
    });

    // test("For two products", () => {
    //     expect(
    //         calculatePrice.execute([
    //             {
    //                 price: 1,
    //                 name: "product1",
    //                 quantity: 1,
    //             },

    //             {
    //                 price: 1,
    //                 name: "product2",
    //                 quantity: 1,
    //             },
    //         ]),
    //     ).toBe(2);
    // });

    // test("For two products with quantity", () => {
    //     expect(
    //         calculatePrice.execute([
    //             {
    //                 price: 1,
    //                 name: "product1",
    //                 quantity: 1,
    //             },

    //             {
    //                 price: 1,
    //                 name: "product2",
    //                 quantity: 2,
    //             },
    //         ]),
    //     ).toBe(3);
    // });

    // test("For one production with price reduction", () => {
    //     // Given
    //     reductionGateway.reduction = {
    //         type: "PRICE_REDUCTION",
    //         amount: 10,
    //     };
    //     // When
    //     // Then
    //     expect(
    //         calculatePrice.execute(
    //             [
    //                 {
    //                     price: 10,
    //                     name: "product1",
    //                     quantity: 1,
    //                 },
    //             ],
    //             "code10",
    //         ),
    //     ).toBe(5);
    // });
});