import * as React from "react";
import { ContextualMenu, IContextualMenuProps, IIconProps } from "@fluentui/react";
import { IconButton } from "@fluentui/react/lib/Button";
import { IDocument } from "./RoomTable";

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}
export interface itemProps {
  itemProps: IDocument;
}
export const MoreButton: React.FunctionComponent<itemProps> = props => {
  const { itemProps } = props;


  const deactivateSubscription = (item: IDocument) => {
    props.itemProps.statusIcon = "Checkbox";
  };

  const activateSubscription = (item: IDocument) => {
    props.itemProps.statusIcon = "CheckboxComposite";
  };

  const goToDetails = (item: IDocument) => {
    console.log(item);
  };

  const changeTrialDate = (item: IDocument) => {
    console.log(item);
  };
  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "details",
        text: "Details",
        iconProps: { iconName: "Settings" },
        onClick(ev?, item?) {
          goToDetails(itemProps);
        },
      },
      {
        key: "changeTrialDate",
        text: "Change trial date",
        iconProps: { iconName: "Edit" },
        onClick(ev?, item?) {
          changeTrialDate(itemProps);
        },
      },
      {
        key: "activateSubscription",
        text: "Activate subscription",
        iconProps: { iconName: "ActivateOrders" },
        onClick(ev?, item?) {
          activateSubscription(itemProps);
        },
      },
      {
        key: "deactivateSubscription",
        text: "Deactivate subscription",
        iconProps: { iconName: "DeactivateOrders" },
        onClick(ev?, item?) {
          deactivateSubscription(itemProps);
        },
      },
    ],
  };
  const moreIcon: IIconProps = { iconName: "More" };

  // eslint-disable-next-line no-undef
  function getMenu(props: IContextualMenuProps): JSX.Element {
    // Customize contextual menu with menuAs
    return <ContextualMenu {...props} />;
  }

  return (
    <IconButton
      {...props}
      iconProps={moreIcon}
      menuProps={menuProps}
      onRenderMenuIcon={() => <div />} // also you can return undefined | null.
      // Optional callback to customize menu rendering
      menuAs={getMenu}
      // Optional callback to do other actions (besides opening the menu) on click
      // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
      // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
      // persistMenu={true}
      allowDisabledFocus
    />
  );
};
