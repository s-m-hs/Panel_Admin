// src/components/RichTextEditor.jsx
import React, { useState, useEffect, useRef } from "react";
import Toolbar from "./Toolbar";
import ParagraphsRenderer from "./ParagraphsRenderer";
import "./RichTextEditor.css";
import { useNavigate } from "react-router-dom";
import ImageResizer from "../../utils/ImageResizer";

const RichTextEditor = () => {
  const navigate = useNavigate();
  const [paragraphs, setParagraphs] = useState(
    JSON.parse(localStorage.getItem("paragraphs")) || []
  );

  const [activeParagraph, setActiveParagraph] = useState(0);
  const [activeRow, setActiveRow] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const [imageSettings, setImageSettings] = useState({
    width: 200,
    height: 200,
    borderRadius: 0,
  });

  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(14);
  const [isBold, setIsBold] = useState(false);

  const [activePopup, setActivePopup] = useState(null);
  const [rowSpacing, setRowSpacing] = useState(10);
  const [elementGap, setElementGap] = useState(10);

  const fileInputRef = useRef(null);

  // ذخیره‌ی داده‌ها در localStorage هر بار که paragraphs تغییر می‌کند
  useEffect(() => {
    localStorage.setItem("paragraphs", JSON.stringify(paragraphs));
  }, [paragraphs]);

  const alignSelfValue = (alignment) => {
    switch (alignment) {
      case "left":
        return "flex-end";
      case "center":
        return "center";
      case "right":
        return "flex-start";
      default:
        return "flex-start";
    }
  };

  const addNewParagraph = () => {
    setParagraphs((prev) => [
      ...prev,
      {
        isAligned: "right",
        elements: [],
        layout: "vertical",
        backgroundColor: "#ffffff",
        border: "1px solid #b3d8f5",
      },
    ]);
    setActiveParagraph(paragraphs.length);
    setActiveRow(null);
    setActiveElement(null);
    setIsImageSelected(false);
    setActivePopup(null);
  };

  const addNewRow = () => {
    setParagraphs((prev) =>
      prev.map((para, i) =>
        i === activeParagraph
          ? {
              ...para,
              elements: [
                ...para.elements,
                {
                  type: "row",
                  elements: [],
                  style: {
                    width: "100%",
                    display: "flex",
                    flexDirection: "row", // پیش‌فرض ردیف افقی
                    flexWrap: "wrap",
                    gap: `${elementGap}px`,
                    marginBottom: `${rowSpacing}px`,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    border: "1px solid #dddddd",
                  },
                },
              ],
            }
          : para
      )
    );
  };

  const deleteParagraph = () => {
    if (paragraphs.length === 0) return;
    setParagraphs((prev) =>
      prev.filter((_, index) => index !== activeParagraph)
    );
    setActiveParagraph((prev) => (prev > 0 ? prev - 1 : 0));
    setActiveRow(null);
    setActiveElement(null);
    setIsImageSelected(false);
    setActivePopup(null);
  };

  const deleteActiveRow = () => {
    if (activeRow === null) return;
    setParagraphs((prev) =>
      prev.map((para, i) =>
        i === activeParagraph
          ? {
              ...para,
              elements: para.elements.filter((_, idx) => idx !== activeRow),
            }
          : para
      )
    );
    setActiveRow(null);
    setActiveElement(null);
    setIsImageSelected(false);
    setActivePopup(null);
  };

  const addNewTextField = () => {
    const textAlignValue = "right";
    const textDirectionValue = "rtl";

    if (activeRow !== null) {
      setParagraphs((prev) =>
        prev.map((para, i) =>
          i === activeParagraph
            ? {
                ...para,
                elements: para.elements.map((el, idx) =>
                  idx === activeRow
                    ? {
                        ...el,
                        elements: [
                          ...el.elements,
                          {
                            type: "text",
                            content: "",
                            style: {
                              textAlign: textAlignValue,
                              direction: textDirectionValue,
                              color: textColor,
                              fontSize,
                              fontWeight: isBold ? "bold" : "normal",
                              width: 200,
                              height: 100,
                              flexShrink: 0,
                              margin: "0px",
                              padding: "10px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                            },
                          },
                        ],
                      }
                    : el
                ),
              }
            : para
        )
      );
    } else {
      alert("لطفاً یک ردیف را انتخاب کنید!");
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          type: "image",
          src: e.target.result,
          style: {
            width: imageSettings.width,
            height: imageSettings.height,
            borderRadius: imageSettings.borderRadius,
            margin: "0px",
            order: 2,
          },
        };

        if (activeRow !== null) {
          // افزودن تصویر در همان ردیف انتخاب شده
          setParagraphs((prev) =>
            prev.map((para, i) =>
              i === activeParagraph
                ? {
                    ...para,
                    elements: para.elements.map((el, idx) =>
                      idx === activeRow
                        ? {
                            ...el,
                            elements: [...el.elements, newImage],
                            style: {
                              ...el.style,
                            },
                          }
                        : el
                    ),
                  }
                : para
            )
          );
          setActiveElement(
            paragraphs[activeParagraph]?.elements[activeRow]?.elements.length
          );
        } else {
          // اگر ردیف انتخاب نشده باشد، تصویر مستقیماً به پاراگراف اضافه می‌شود
          setParagraphs((prev) =>
            prev.map((para, i) =>
              i === activeParagraph
                ? {
                    ...para,
                    elements: [...para.elements, newImage],
                  }
                : para
            )
          );
          setActiveElement(paragraphs[activeParagraph]?.elements.length);
        }
        setIsImageSelected(true);
        setActivePopup(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteActiveElement = () => {
    if (activeElement === null) return;
    if (activeRow !== null) {
      // حذف عنصر از ردیف
      setParagraphs((prev) =>
        prev.map((para, i) =>
          i === activeParagraph
            ? {
                ...para,
                elements: para.elements.map((el, idx) =>
                  idx === activeRow
                    ? {
                        ...el,
                        elements: el.elements.filter(
                          (_, idx2) => idx2 !== activeElement
                        ),
                      }
                    : el
                ),
              }
            : para
        )
      );
    } else {
      // حذف عنصر از پاراگراف
      setParagraphs((prev) =>
        prev.map((para, i) =>
          i === activeParagraph
            ? {
                ...para,
                elements: para.elements.filter(
                  (_, idx) => idx !== activeElement
                ),
              }
            : para
        )
      );
    }
    setActiveElement(null);
    setIsImageSelected(false);
    setImageSettings({
      width: 200,
      height: 200,
      borderRadius: 0,
    });
    setActivePopup(null);
  };

  const changeAlignment = (alignment) => {
    const textDirectionValue =
      alignment === "right" ? "rtl" : alignment === "left" ? "ltr" : "rtl";

    if (activeRow !== null) {
      setParagraphs((prev) =>
        prev.map((para, i) =>
          i === activeParagraph
            ? {
                ...para,
                elements: para.elements.map((el, idx) =>
                  idx === activeRow
                    ? {
                        ...el,
                        style: {
                          ...el.style,
                          justifyContent: alignSelfValue(alignment),
                        },
                        elements: el.elements.map((child) =>
                          child.type === "text"
                            ? {
                                ...child,
                                style: {
                                  ...child.style,
                                  textAlign: alignment,
                                  direction: textDirectionValue,
                                },
                              }
                            : child
                        ),
                      }
                    : el
                ),
              }
            : para
        )
      );
    } else {
      setParagraphs((prev) =>
        prev.map((para, i) =>
          i === activeParagraph
            ? {
                ...para,
                elements: para.elements.map((child) =>
                  child.type === "text"
                    ? {
                        ...child,
                        style: {
                          ...child.style,
                          textAlign: alignment,
                          direction: textDirectionValue,
                        },
                      }
                    : child
                ),
              }
            : para
        )
      );
    }
  };

  const changeTextAlignment = (alignment) => {
    const textDirectionValue =
      alignment === "right" ? "rtl" : alignment === "left" ? "ltr" : "rtl";

    if (activeElement === null) return;

    setParagraphs((prev) =>
      prev.map((para, paraIdx) =>
        paraIdx !== activeParagraph
          ? para
          : {
              ...para,
              elements: para.elements.map((element, elementIdx) => {
                if (elementIdx === activeRow && element.type === "row") {
                  return {
                    ...element,
                    elements: element.elements.map((child, childIdx) =>
                      childIdx === activeElement && child.type === "text"
                        ? {
                            ...child,
                            style: {
                              ...child.style,
                              textAlign: alignment,
                              direction: textDirectionValue,
                            },
                          }
                        : child
                    ),
                  };
                }

                if (
                  activeRow === null &&
                  element.type === "text" &&
                  elementIdx === activeElement
                ) {
                  return {
                    ...element,
                    style: {
                      ...element.style,
                      textAlign: alignment,
                      direction: textDirectionValue,
                    },
                  };
                }
                return element;
              }),
            }
      )
    );
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
    if (
      activeElement !== null &&
      ((activeRow !== null &&
        paragraphs[activeParagraph].elements[activeRow]?.elements[
          activeElement
        ]?.type === "text") ||
        (activeRow === null &&
          paragraphs[activeParagraph].elements[activeElement]?.type ===
            "text"))
    ) {
      if (activeRow !== null) {
        setParagraphs((prev) =>
          prev.map((para, i) =>
            i === activeParagraph
              ? {
                  ...para,
                  elements: para.elements.map((el, idx) =>
                    idx === activeRow
                      ? {
                          ...el,
                          elements: el.elements.map((contentItem, idx2) =>
                            idx2 === activeElement &&
                            contentItem.type === "text"
                              ? {
                                  ...contentItem,
                                  style: {
                                    ...contentItem.style,
                                    color: color,
                                  },
                                }
                              : contentItem
                          ),
                        }
                      : el
                  ),
                }
              : para
          )
        );
      } else {
        setParagraphs((prev) =>
          prev.map((para, i) =>
            i === activeParagraph
              ? {
                  ...para,
                  elements: para.elements.map((contentItem, idx) =>
                    idx === activeElement && contentItem.type === "text"
                      ? {
                          ...contentItem,
                          style: {
                            ...contentItem.style,
                            color: color,
                          },
                        }
                      : contentItem
                  ),
                }
              : para
          )
        );
      }
    }
    setActivePopup(null);
  };

  const handleFontSizeChange = (size) => {
    setFontSize(size);
    if (
      activeElement !== null &&
      ((activeRow !== null &&
        paragraphs[activeParagraph].elements[activeRow]?.elements[
          activeElement
        ]?.type === "text") ||
        (activeRow === null &&
          paragraphs[activeParagraph].elements[activeElement]?.type ===
            "text"))
    ) {
      if (activeRow !== null) {
        setParagraphs((prev) =>
          prev.map((para, i) =>
            i === activeParagraph
              ? {
                  ...para,
                  elements: para.elements.map((el, idx) =>
                    idx === activeRow
                      ? {
                          ...el,
                          elements: el.elements.map((contentItem, idx2) =>
                            idx2 === activeElement &&
                            contentItem.type === "text"
                              ? {
                                  ...contentItem,
                                  style: {
                                    ...contentItem.style,
                                    fontSize: size,
                                  },
                                }
                              : contentItem
                          ),
                        }
                      : el
                  ),
                }
              : para
          )
        );
      } else {
        setParagraphs((prev) =>
          prev.map((para, i) =>
            i === activeParagraph
              ? {
                  ...para,
                  elements: para.elements.map((contentItem, idx) =>
                    idx === activeElement && contentItem.type === "text"
                      ? {
                          ...contentItem,
                          style: {
                            ...contentItem.style,
                            fontSize: size,
                          },
                        }
                      : contentItem
                  ),
                }
              : para
          )
        );
      }
    }
    setActivePopup(null);
  };

  const handleBoldToggle = () => {
    setIsBold((prev) => !prev);
    if (
      activeElement !== null &&
      ((activeRow !== null &&
        paragraphs[activeParagraph].elements[activeRow]?.elements[
          activeElement
        ]?.type === "text") ||
        (activeRow === null &&
          paragraphs[activeParagraph].elements[activeElement]?.type ===
            "text"))
    ) {
      if (activeRow !== null) {
        setParagraphs((prev) =>
          prev.map((para, i) =>
            i === activeParagraph
              ? {
                  ...para,
                  elements: para.elements.map((el, idx) =>
                    idx === activeRow
                      ? {
                          ...el,
                          elements: el.elements.map((contentItem, idx2) =>
                            idx2 === activeElement &&
                            contentItem.type === "text"
                              ? {
                                  ...contentItem,
                                  style: {
                                    ...contentItem.style,
                                    fontWeight: !isBold ? "bold" : "normal",
                                  },
                                }
                              : contentItem
                          ),
                        }
                      : el
                  ),
                }
              : para
          )
        );
      } else {
        setParagraphs((prev) =>
          prev.map((para, i) =>
            i === activeParagraph
              ? {
                  ...para,
                  elements: para.elements.map((contentItem, idx) =>
                    idx === activeElement && contentItem.type === "text"
                      ? {
                          ...contentItem,
                          style: {
                            ...contentItem.style,
                            fontWeight: !isBold ? "bold" : "normal",
                          },
                        }
                      : contentItem
                  ),
                }
              : para
          )
        );
      }
    }
    setActivePopup(null);
  };

  const handleTextResize = (
    paraIdx,
    itemIdx,
    newWidth,
    newHeight,
    rowIdx = null
  ) => {
    if (rowIdx !== null) {
      setParagraphs((prev) =>
        prev.map((para, pIdx) =>
          pIdx === paraIdx
            ? {
                ...para,
                elements: para.elements.map((el, eIdx) =>
                  eIdx === rowIdx
                    ? {
                        ...el,
                        elements: el.elements.map((contentItem, cIdx) =>
                          cIdx === itemIdx
                            ? {
                                ...contentItem,
                                style: {
                                  ...contentItem.style,
                                  width: newWidth,
                                  height: newHeight,
                                },
                              }
                            : contentItem
                        ),
                      }
                    : el
                ),
              }
            : para
        )
      );
    } else {
      setParagraphs((prev) =>
        prev.map((para, pIdx) =>
          pIdx === paraIdx
            ? {
                ...para,
                elements: para.elements.map((el, eIdx) =>
                  eIdx === itemIdx
                    ? {
                        ...el,
                        style: {
                          ...el.style,
                          width: newWidth,
                          height: newHeight,
                        },
                      }
                    : el
                ),
              }
            : para
        )
      );
    }
  };

// در RichTextEditor.jsx

// آپدیت فاصله بین ردیف‌ها
useEffect(() => {
  if (rowSpacing !== null && activeParagraph !== null) {
    setParagraphs((prev) =>
      prev.map((para, i) =>
        i === activeParagraph
          ? {
              ...para,
              elements: para.elements.map((el) =>
                el.type === "row"
                  ? {
                      ...el,
                      style: {
                        ...el.style,
                        marginBottom: `${rowSpacing}px`,
                      },
                    }
                  : el
              ),
            }
          : para
      )
    );
  }
}, [rowSpacing, activeParagraph]);

// آپدیت فاصله افقی بین عناصر
useEffect(() => {
  if (elementGap !== null && activeParagraph !== null) {
    setParagraphs((prev) =>
      prev.map((para, i) =>
        i === activeParagraph
          ? {
              ...para,
              elements: para.elements.map((el) =>
                el.type === "row"
                  ? {
                      ...el,
                      style: {
                        ...el.style,
                        gap: `${elementGap}px`,
                      },
                    }
                  : el
              ),
            }
          : para
      )
    );
  }
}, [elementGap, activeParagraph]);

  // تابع تغییر جهت ردیف بین افقی و عمودی
  const toggleRowDirection = () => {
    if (activeRow === null) {
      alert("لطفاً یک ردیف را انتخاب کنید!");
      return;
    }
    setParagraphs((prev) =>
      prev.map((para, i) =>
        i === activeParagraph
          ? {
              ...para,
              elements: para.elements.map((el, idx) =>
                idx === activeRow
                  ? {
                      ...el,
                      style: {
                        ...el.style,
                        flexDirection:
                          el.style.flexDirection === "row" ? "column" : "row",
                      },
                    }
                  : el
              ),
            }
          : para
      )
    );
  };

  const saveData = () => {
    localStorage.setItem("paragraphs", JSON.stringify(paragraphs));
    alert("داده‌ها با موفقیت ذخیره شدند!");
  };
  const viewData = () => {
    navigate("/home");
  };

  const handleRowSpacingChange = (newSpacing) => {
    setRowSpacing(newSpacing);
    setParagraphs((prev) =>
      prev.map((para, i) =>
        i === activeParagraph
          ? {
              ...para,
              elements: para.elements.map((el) =>
                el.type === "row"
                  ? {
                      ...el,
                      style: {
                        ...el.style,
                        marginBottom: `${newSpacing}px`,
                      },
                    }
                  : el
              ),
            }
          : para
      )
    );
  };

  return (
    <div className="rich-text-editor">
          <ImageResizer/>
      <Toolbar
        addNewParagraph={addNewParagraph}
        addNewRow={addNewRow}
        addNewTextField={addNewTextField}
        openFileDialog={openFileDialog}
        changeAlignment={changeAlignment}
        changeTextAlignment={changeTextAlignment}
        handleBoldToggle={handleBoldToggle}
        deleteParagraph={deleteParagraph}
        deleteActiveRow={deleteActiveRow}
        deleteActiveElement={deleteActiveElement}
        activeElement={activeElement}
        activeRow={activeRow}
        paragraphs={paragraphs}
        activeParagraph={activeParagraph}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
        rowSpacing={rowSpacing}
        // setRowSpacing={setRowSpacing}
        elementGap={elementGap}
        setElementGap={setElementGap}
        activePopup={activePopup}
        setActivePopup={setActivePopup}
        isBold={isBold}
        textColor={textColor}
        handleTextColorChange={handleTextColorChange}
        fontSize={fontSize}
        handleFontSizeChange={handleFontSizeChange}
        toggleRowDirection={toggleRowDirection}
        setRowSpacing={handleRowSpacingChange}

      />

      <div className="editor-buttons">
        <button className="save-button" onClick={saveData}>
          ذخیره
        </button>
        <button className="view-button" onClick={viewData}>
          مشاهده
        </button>
      </div>

      <ParagraphsRenderer
        paragraphs={paragraphs}
        activeParagraph={activeParagraph}
        activeRow={activeRow}
        activeElement={activeElement}
        setActiveParagraph={setActiveParagraph}
        setActiveRow={setActiveRow}
        setActiveElement={setActiveElement}
        setIsImageSelected={setIsImageSelected}
        setActivePopup={setActivePopup}
        handleTextResize={handleTextResize}
        setImageSettings={setImageSettings}
        setParagraphs={setParagraphs}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default RichTextEditor;
