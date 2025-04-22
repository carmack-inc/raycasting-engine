import { describe, expect, it } from "vitest";
import { ActionsFlags, InputManager } from "./inputManager";

describe("Function registerKeyboardInput", () => {
  it("should register the correct action based on key", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("W");
    const set = input.getKeyboardSet();
    const setTest = new Set().add("UP_KEY");
    expect(set).toEqual(setTest);
  });

  it("should ignore with the key is not unregistered in actions", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("Z");
    const set = input.getKeyboardSet();
    const setTest = new Set();
    expect(set).toEqual(setTest);
  });

  it("should register multiple actions flags correctly based in key", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("W");
    input.registerKeyboardInput("A");
    input.registerKeyboardInput("S");
    const set = input.getKeyboardSet();
    const setTest = new Set<ActionsFlags>();
    setTest.add("UP_KEY");
    setTest.add("LEFT_KEY");
    setTest.add("DOWN_KEY");
    expect(set).toEqual(setTest);
  });

  it("should register actions flags correctly based on key regardless the case of them", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("w");
    input.registerKeyboardInput("A");
    input.registerKeyboardInput("s");
    const set = input.getKeyboardSet();
    const setTest = new Set<ActionsFlags>();
    setTest.add("UP_KEY");
    setTest.add("LEFT_KEY");
    setTest.add("DOWN_KEY");
    expect(set).toEqual(setTest);
  });

  it("should not register two equals actions flags regardless the case of them", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("w");
    input.registerKeyboardInput("W");
    const set = input.getKeyboardSet();
    const setTest = new Set<ActionsFlags>();
    setTest.add("UP_KEY");
    expect(set).toEqual(setTest);
  });
});

describe("Function deregisterKeyboardInput", () => {
  it("should deregister the correct action based on key", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("W");
    const set = input.getKeyboardSet();
    const setTest = new Set().add("UP_KEY");
    expect(set).toEqual(setTest);
    input.deregisterKeyboardInput("W");
    setTest.delete("UP_KEY");
    expect(set).toEqual(setTest);
  });

  it("should deregister multiple action based on keys", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("W");
    input.registerKeyboardInput("A");
    const set = input.getKeyboardSet();
    const setTest = new Set();
    setTest.add("UP_KEY");
    setTest.add("LEFT_KEY");
    expect(set).toEqual(setTest);
    input.deregisterKeyboardInput("W");
    input.deregisterKeyboardInput("A");
    setTest.delete("UP_KEY");
    setTest.delete("LEFT_KEY");
    expect(set).toEqual(setTest);
  });

  it("should deregister multiple action based onn keys regardless the case of them", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("W");
    input.registerKeyboardInput("A");
    const set = input.getKeyboardSet();
    const setTest = new Set();
    setTest.add("UP_KEY");
    setTest.add("LEFT_KEY");
    expect(set).toEqual(setTest);
    input.deregisterKeyboardInput("w");
    input.deregisterKeyboardInput("a");
    setTest.delete("UP_KEY");
    setTest.delete("LEFT_KEY");
    expect(set).toEqual(setTest);
  });

  it("should not throw erro when deregister a unregistered action", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.registerKeyboardInput("W");
    const set = input.getKeyboardSet();
    const setTest = new Set();
    setTest.add("UP_KEY");
    expect(set).toEqual(setTest);
    input.deregisterKeyboardInput("Z");
    expect(set).toEqual(setTest);
  });
});

describe("Functions produceMouseInput/consumeMouseInput", () => {
  it("should produce a number based on mouse movement and allowed its consume", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.produceMouseInput(12);
    const cInput = input.consumeMouseInput();
    expect(cInput).toBe(12);
  });

  it("should set mouse input to 0 when it is consumed", () => {
    const UP_KEY = "W";
    const DOWN_KEY = "S";
    const LEFT_KEY = "A";
    const RIGHT_KEY = "D";
    const input = new InputManager({ UP_KEY, DOWN_KEY, LEFT_KEY, RIGHT_KEY });
    input.produceMouseInput(12);
    const cInput = input.consumeMouseInput();
    const cInput2 = input.consumeMouseInput();
    expect(cInput2).toBe(0);
  });
});
