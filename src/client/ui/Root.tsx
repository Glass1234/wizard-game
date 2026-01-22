import React from "@rbxts/react";
import { App } from "./App";
import { Players } from "@rbxts/services";
import ReactRoblox from "@rbxts/react-roblox";

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;

const screenGui = new Instance("ScreenGui");
screenGui.Name = "ReactUI";
screenGui.IgnoreGuiInset = true;
screenGui.ResetOnSpawn = false;
screenGui.Parent = playerGui;

const root = ReactRoblox.createRoot(screenGui);

root.render(<App />);
