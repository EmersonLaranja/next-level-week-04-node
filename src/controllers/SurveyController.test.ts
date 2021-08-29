import * as SurveyController from "./SurveyController"
// @ponicode
describe("create", () => {
    let inst: any

    beforeEach(() => {
        inst = new SurveyController.SurveyController()
    })

    test("0", async () => {
        await inst.create(undefined, undefined)
    })
})
