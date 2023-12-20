import React, {
  KeyboardEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "@ds.e/scss/dist/Select.css";
import Text from "../../atoms/Text";

const KEY_CODES = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  UP: 38,
  DOWN: 40,
};

interface SelectOption {
  label: string;
  value: string;
}

interface RenderOptionProps {
  isSelected?: boolean;
  option: SelectOption;
  getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
  label?: string;
  options?: Array<SelectOption>;
  onOptionSelected?: (option: SelectOption, optionIndx: number) => void;
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const getNextOptionIndex = (
  currentIndex: number | null,
  options: SelectOption[]
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === options.length - 1) {
    return 0;
  }

  return currentIndex + 1;
};

const getPrevOptionIndex = (
  currentIndex: number | null,
  options: SelectOption[]
) => {
  if (currentIndex === null) {
    return 0;
  }

  if (currentIndex === 0) {
    return options.length - 1;
  }

  return currentIndex - 1;
};

const Select: React.FC<SelectProps> = ({
  label = "Please select an option",
  options = [],
  onOptionSelected,
  renderOption,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [optionRefs, setOptionRefs] = useState<
    React.RefObject<HTMLLIElement>[]
  >([]);

  const labelRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
  }, [labelRef.current?.offsetHeight]);

  useLayoutEffect(() => {
    if (highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];
      if (ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex]);

  useEffect(() => {
    setOptionRefs(options.map((_) => React.createRef<HTMLLIElement>()));
  }, [options.length]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: SelectOption, index: number) => {
    if (onOptionSelected) {
      onOptionSelected(option, index);
    }
    setSelectedIndex(index);
    setIsOpen(false);
  };

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    //handle escape key press
    if (event.keyCode === KEY_CODES.ESCAPE) {
      setIsOpen(false);
      return;
    }

    //handle down arrow key press
    if (event.keyCode === KEY_CODES.DOWN) {
      highLightItem(getNextOptionIndex(highlightedIndex, options));
    }

    //handle up arrow key press
    if (event.keyCode === KEY_CODES.UP) {
      highLightItem(getPrevOptionIndex(highlightedIndex, options));
    }

    //handle enter key press
    if (event.keyCode === KEY_CODES.ENTER) {
      handleOptionClick(options[highlightedIndex!], highlightedIndex!);
    }
  };

  const keyButtonHandler: KeyboardEventHandler = (event) => {
    event.preventDefault();
    if (
      [KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN].includes(event.keyCode)
    ) {
      setIsOpen(true);
      highLightItem(0);
    }
  };

  const highLightItem = (optionIndex: number | null) => {
    setHighlightedIndex(optionIndex);
  };

  let selectedOption = null;
  if (selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  return (
    <div className="dse-select">
      <button
        ref={labelRef}
        className="dse-select__label"
        onClick={handleClick}
        aria-haspopup={true}
        aria-expanded={isOpen ? true : undefined}
        aria-controls="dse-select-list"
        onKeyDown={keyButtonHandler}
        tabIndex={0}
      >
        <Text>{selectedOption ? selectedOption.label : label}</Text>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`dse-select__caret ${
            isOpen ? "dse-select__caret--open" : "dse-select__caret--close"
          }`}
          width={"1rem"}
          height={"1rem"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          role="menu"
          id="dse-select-list"
          tabIndex={-1}
          style={{ top: overlayTop }}
          className="dse-select__overlay"
        >
          {options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isHighlighted = highlightedIndex === index;
            const ref = optionRefs[index];

            const renderOptionProps: RenderOptionProps = {
              isSelected,
              option,
              getOptionRecommendedProps: (overrideProps = {}) => ({
                //we will define default props here
                key: option.value,
                className: ` dse-select__option ${
                  isSelected ? "dse-select__option--selected" : ""
                } ${isHighlighted ? "dse-select__option--highlighted" : ""} `,
                ref,
                role: "menuitemradio",
                "aria-checked": isSelected ? true : undefined,
                "aria-label": option.label,
                "aria-selected": isSelected ? true : undefined,
                tabIndex: isHighlighted ? 0 : -1,
                onClick: () => handleOptionClick(option, index),
                onMouseEnter: () => highLightItem(index),
                onMouseLeave: () => highLightItem(null),
                onKeyDown: onOptionKeyDown,

                //here we will spread the override props
                ...overrideProps,
              }),
            };
            if (renderOption) {
              return renderOption(renderOptionProps);
            }

            return (
              <li {...renderOptionProps.getOptionRecommendedProps()}>
                <Text>{option.label}</Text>
                {isSelected && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="dse-select__caret"
                    width={"1rem"}
                    height={"1rem"}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
