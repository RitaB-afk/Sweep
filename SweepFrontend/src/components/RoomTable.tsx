/* eslint-disable no-use-before-define */
import * as React from "react";
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from "@fluentui/react/lib/DetailsList";
import { Dialog, Modal } from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { IconButton, ISearchBoxStyles, SearchBox, TooltipHost } from "@fluentui/react";
import { Room } from "../data/data";
import { useState } from "react";
import { MoreButton } from "./MoreButton";

const searchBoxStyles: ISearchBoxStyles = {
  root: {
    width: "50%",
    selectors: {
      ":after": {
      },
    },
  },
  icon: {
    color: "#941d55",
  },
};


const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px",
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden",
      },
    },
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap",
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px",
  },
  selectionDetails: {
    marginBottom: "20px",
  },
});

  export interface IDocument {
    statusIcon: string;
    roomNumber: number;
    roomCategory: string;
    roomLevel: number;
    roomOccupancyStatus: string;
    lastCleaned: string;
    cleaningStatus: string;
    comment: string;
  }

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: Room[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}

const _generateDocuments = (customers2: Room[]) => {
  const rooms: Room[] = customers2.map(item => {
    return {
      id: item.id,
      key: item.id,
      RoomNumber: item.RoomNumber,
      RoomCategory: item.RoomCategory,
      RoomLevel: item.RoomLevel,
      RoomOccupancyStatus: item.RoomOccupancyStatus,
      LastCleaned: item.LastCleaned,
      CleaningStatus: item.CleaningStatus,
      Comment: item.Comment
    };
  });
  return rooms;
};
export const RoomTable: React.FunctionComponent<IDetailsListDocumentsExampleState> = ({items}) => {
const allItems = _generateDocuments(items)
  const onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = allItems;
    setSortedColumns({
      columns: newColumns,
    });
  };
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Cleaning status",
      fieldName: "CleaningStatus",
      className: classNames.fileIconCell,
      iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: "Column operations for File type, Press to sort on File type",
      minWidth: 20,
      maxWidth: 100,
      onColumnClick,
      onRender: (item: Room) => {
        return <span>{item.CleaningStatus}</span>;
      },
      isPadded: true,
    },
    {
      key: "column2",
      name: "Number",
      fieldName: "RoomNumber",
      className: classNames.fileIconCell,
      iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: "Column operations for File type, Press to sort on File type",
      minWidth: 20,
      maxWidth: 50,
      onColumnClick,
      onRender: (item: Room) => {
        return <span>{item.RoomNumber}</span>;
      },
      isPadded: true,
     },
    {
      key: "column3",
      name: "Occupancy",
      fieldName: "RoomOccupancyStatus",
      className: classNames.fileIconCell,
      iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: "Column operations for File type, Press to sort on File type",
      minWidth: 80,
      maxWidth: 90,
      onColumnClick,
      onRender: (item: Room) => {
        return <span>{item.RoomOccupancyStatus}</span>;
      },
      isPadded: true,
    },
    {
      key: "column4",
      name: "Category",
      fieldName: "RoomCategory",
      minWidth: 50,
      maxWidth: 100,
      isSorted: undefined,
      isRowHeader: true,
      isResizable: true,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      onColumnClick,
      data: "string",
      isPadded: true,
    },
    {
      key: "column5",
      name: "Floor",
      fieldName: "RoomLevel",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onColumnClick,
      data: "number",
      onRender: (item: Room) => {
        return <span>{item.RoomLevel}</span>;
      },
      isPadded: true,
    },
    {
      key: "column6",
      name: "Comment",
      fieldName: "Comment",
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      isCollapsible: true,
      data: "string",
      onColumnClick,
      onRender: (item: Room) => {
        return <span>{item.Comment}</span>;
      },
      isPadded: true,
    },
    {
      key: "column7",
      name: "Last Cleaned",
      fieldName: "LastCleaned",
      minWidth: 50,
      maxWidth: 150,
      isResizable: true,
      isCollapsible: true,
      data: "string",
      onColumnClick,
      onRender: (item: Room) => {
        return <span>{item.LastCleaned}</span>;
      },
    },
    {
      onRenderHeader: () => {
        return null;
      },
      key: "column8",
      name: "More",
      fieldName: "actionButton",
      minWidth: 30,
      maxWidth: 50,
      isResizable: false,
      isCollapsible: true,
      data: "string",
      onColumnClick,
      onRender: (item:Room) => {
        return <MoreButton itemProps={item}/>;
      },
    }
  ];

  

  const [sortedColumns, setSortedColumns] = useState({
    columns,
  });



  const ToggleColumns = (columns: IColumn[], filters: string[]) => {
    const visibleColumns = columns;
    const newVisibleColumns = visibleColumns.filter(element => {
      return filters.includes(element.name);
    });
    return newVisibleColumns;
  };

  const _getKey = (item: any, index?: number): string => {
    return item.key;
  };

  const _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
   // setItems({
   //   items: text ? allItems.filter((item: Room) => item.RoomCategory.toLowerCase().indexOf(text) > -1) : allItems,
  //  });
  };
  const _onItemInvoked = (item: Room): void => {
    alert(`Item invoked: ${item.LastCleaned}`);

  };

 

  return (
    <div>
      <div className={classNames.controlWrapper}>
        {/* @ts-ignore */}
        <SearchBox  styles={searchBoxStyles} placeholder="Search by name" onChange={_onChangeText} underlined></SearchBox>
      </div>
      <DetailsList
        columns={columns}
        items={items}
        selectionMode={SelectionMode.multiple}
        getKey={_getKey}
        setKey="multiple"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
        selectionPreservedOnEmptyClick={true}
        onItemInvoked={_onItemInvoked}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    </div>
  );
};
