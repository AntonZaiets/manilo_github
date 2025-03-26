import React, { useCallback, useMemo, useState } from "react";
import { CATALOG_SORT_TYPE, TTabITabOptionsEx } from "interface";
import { useDispatch, useSelector } from "react-redux";
import {
  getCatalog,
  selectCatalog,
  updateFilters,
  updateSorter,
} from "store/catalogSlice";
import { AppDispatch } from "store/store";
import { Search } from "images/icons";
import _ from "lodash";

interface ITab {
  key: string;
  title: string;
  id: string;
  hidden: boolean;
  activeTab?: string;
  disabled: boolean;
}

export const Tab = (props: ITab) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sorter } = useSelector(selectCatalog);
  const { title, id } = props;
  const [typeSorted, setSorter] = useState("");

  const sorterType = !!sorter && sorter.split(",")[1];
  const sorterField = !!sorter && sorter.split(",")[0];
  const isTypeMatches = id === sorterField;
  const addStyle = (typeSorted || sorterType) && isTypeMatches;

  const onClickSorted = () => {
    const type = typeSorted === "" ? "asc" : typeSorted === "asc" ? "desc" : "";
    setSorter(type);
    const getSortStr = type !== "" ? `${id},${type}` : "";
    dispatch(updateSorter(getSortStr));
    dispatch(getCatalog());
  };

  const checkArrow = (arrow: "asc" | "desc") => {
    return (typeSorted === arrow || sorterType === arrow) && isTypeMatches;
  };

  return (
    <div
      className={`tab ${!!addStyle && "tab_opacity"}`}
      onClick={onClickSorted}
    >
      <span>{title}</span>
      <span className="arrow_sort">
        {checkArrow("asc") && <ArrowUp />}
        {checkArrow("desc") && <ArrowDown />}
      </span>
    </div>
  );
};

export const SearchTab = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector(selectCatalog);
  const [value, setValue] = useState(filters);

  const sendRequest = useCallback((value: string) => {
    if (value) {
      dispatch(updateFilters(value));
      dispatch(getCatalog());
    } else {
      dispatch(updateFilters(""));
      dispatch(getCatalog());
    }
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return _.debounce(sendRequest, 1000);
  }, [sendRequest]);

  const onChange = (e: any) => {
    const value = e.target.value;
    setValue(value);
    debouncedSendRequest(value);
  };

  return (
    <div className="search_tab">
      <div className="flex">
        <input
          name="search"
          placeholder=""
          className="search_tab__input"
          onChange={onChange}
          value={value}
        />
        <div className="search_tab__block">
          <Search className="search_tab__icon" fill="#c4b051" />
        </div>
      </div>
    </div>
  );
};

const ArrowUp = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 0l8 9h-6v15h-4v-15h-6z" />
    </svg>
  );
};

const ArrowDown = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 24l-8-9h6v-15h4v15h6z" />
    </svg>
  );
};

export const getCatalogSort: TTabITabOptionsEx<CATALOG_SORT_TYPE> = [
  {
    key: CATALOG_SORT_TYPE.NEW,
    text: "За новизною",
  },
  {
    key: CATALOG_SORT_TYPE.POPULAR,
    text: "За популярністю",
  },
  {
    key: CATALOG_SORT_TYPE.PRICE,
    text: "За ціною",
  },
];
