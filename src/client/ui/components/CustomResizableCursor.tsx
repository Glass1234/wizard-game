import React, { useEffect, useState } from "@rbxts/react";
import { UserInputService, RunService } from "@rbxts/services";

export const CustomResizableCursor = () => {
  const [position, setPosition] = useState(new Vector2(0, 0));

  useEffect(() => {
    UserInputService.MouseIconEnabled = false;

    const connection = RunService.RenderStepped.Connect(() => {
      const mousePos = UserInputService.GetMouseLocation();
      setPosition(mousePos);
    });

    return () => {
      connection.Disconnect();
      UserInputService.MouseIconEnabled = true;
    };
  }, []);

  return (
    <screengui DisplayOrder={100} IgnoreGuiInset={true}>
      <imagelabel
        Image="rbxassetid://95779806043971"
        Size={new UDim2(0, 32, 0, 32)} 
        Position={UDim2.fromOffset(position.X, position.Y)}
        AnchorPoint={new Vector2(0.5, 0.5)}
        BackgroundTransparency={1}
      />
    </screengui>
  );
};
