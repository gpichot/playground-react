import React from "react";
import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";

import * as stories from "./SignInForm.stories";

const { Default } = composeStories(stories);

describe("NFTCard", () => {
  it("submit user data using stories", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Default {...Default.args} onSubmit={onSubmit} />
    );

    await Default.play({
      args: { onSubmit },
      canvasElement: container,
    });

    expect(onSubmit).toHaveBeenCalledWith({
      email: "admin@test.com",
      password: "admin",
    });
  });
});
