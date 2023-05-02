"use strict";

import { beforeAll, expect, it } from "@jest/globals";

import { describe } from "@jest/globals";
import cp from "../src";

describe("push --dry-run", function () {
    let spawner: Awaited<ReturnType<typeof cp.async>>;
    beforeAll(async function () {
        spawner = await cp.async("git", [
            "push",
            "origin",
            "private",
            "--dry-run",
        ]);
    });
    it("should have properties", function () {
        expect(spawner).toHaveProperty("output");
        expect(spawner).toHaveProperty("err");
        expect(spawner).toHaveProperty("stderr");
        expect(spawner).toHaveProperty("stdout");
    });
});
