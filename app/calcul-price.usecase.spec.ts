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

    test("For one product with direct reduction and a final price < 1", async () => {
        const result = await calculatePrice.execute([
            {
                price: 5,
                name: "product1",
                quantity: 1,
            },
        ])
        expect(result).toBe(1)
    })
});