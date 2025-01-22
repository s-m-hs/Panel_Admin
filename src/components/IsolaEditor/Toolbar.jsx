// src/components/Toolbar.jsx
import React from 'react'
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaBold,
  FaPlus,
  FaUpload,
  FaTrashAlt,
  FaGripLines,
  FaPencilAlt,
  FaMinusCircle,
  FaArrowsAltV,
  FaArrowsAltH,
  FaPaintBrush,
  FaTextHeight
} from 'react-icons/fa'
import './Toolbar.css'

const Toolbar = ({
  addNewParagraph,
  addNewRow,
  addNewTextField,
  openFileDialog,
  changeAlignment,
  changeTextAlignment,
  handleBoldToggle,
  deleteParagraph,
  deleteActiveRow,
  deleteActiveElement,
  activeElement,
  activeRow,
  paragraphs,
  activeParagraph,
  fileInputRef,
  handleImageUpload,
  rowSpacing,
  setRowSpacing,
  elementGap,
  setElementGap,
  activePopup,
  setActivePopup,
  isBold,
  textColor,
  handleTextColorChange,
  fontSize,
  handleFontSizeChange,
  toggleRowDirection
}) => {
  // تابع برای تعیین قابلیت فعال بودن دکمه‌ها
  const isTextActive = () => {
    if (activeElement === null) return false
    const element =
      activeRow !== null
        ? paragraphs[activeParagraph]?.elements[activeRow]?.elements[
            activeElement
          ]
        : paragraphs[activeParagraph]?.elements[activeElement]
    return element?.type === 'text'
  }

  return (
    <div className='toolbar' style={{ marginTop: '40px', direction: 'rtl' }}>
      {/* افزودن پاراگراف */}
      <div className='icon-button-container'>
        <button
          onClick={addNewParagraph}
          className='toolbar-button add-paragraph'
        >
          <FaPlus size={16} />
          <span className='tooltip'>افزودن پاراگراف</span>
        </button>
      </div>

      {/* افزودن ردیف */}
      <div className='icon-button-container'>
        <button onClick={addNewRow} className='toolbar-button add-row'>
          <FaGripLines size={16} />
          <span className='tooltip'>افزودن ردیف</span>
        </button>
      </div>

      {/* افزودن متن */}
      <div className='icon-button-container'>
        <button onClick={addNewTextField} className='toolbar-button add-text'>
          <FaPencilAlt size={16} />
          <span className='tooltip'>افزودن متن</span>
        </button>
      </div>

      {/* آپلود عکس */}
      <div className='icon-button-container'>
        <button
          onClick={openFileDialog}
          className='toolbar-button upload-image'
        >
          <FaUpload size={16} />
          <span className='tooltip'>آپلود عکس</span>
        </button>
      </div>

      {/* تراز بندی عناصر */}
      <div className='icon-button-container'>
        <button
          onClick={() => changeAlignment('right')}
          className='toolbar-button align-right'
        >
          <FaAlignRight size={16} />
          <span className='tooltip'>راست‌چین عناصر</span>
        </button>
      </div>

      <div className='icon-button-container'>
        <button
          onClick={() => changeAlignment('center')}
          className='toolbar-button align-center'
        >
          <FaAlignCenter size={16} />
          <span className='tooltip'>وسط‌چین عناصر</span>
        </button>
      </div>

      <div className='icon-button-container'>
        <button
          onClick={() => changeAlignment('left')}
          className='toolbar-button align-left'
        >
          <FaAlignLeft size={16} />
          <span className='tooltip'>چپ‌چین عناصر</span>
        </button>
      </div>

      {/* تراز بندی متن داخل textarea */}
      <div className='icon-button-container'>
        <button
          onClick={() => changeTextAlignment('right')}
          className='toolbar-button align-text-right'
          disabled={!isTextActive()}
        >
          <FaAlignRight size={16} />
          <span className='tooltip'>راست‌چین متن</span>
        </button>
      </div>

      <div className='icon-button-container'>
        <button
          onClick={() => changeTextAlignment('center')}
          className='toolbar-button align-text-center'
          disabled={!isTextActive()}
        >
          <FaAlignCenter size={16} />
          <span className='tooltip'>وسط‌چین متن</span>
        </button>
      </div>

      <div className='icon-button-container'>
        <button
          onClick={() => changeTextAlignment('left')}
          className='toolbar-button align-text-left'
          disabled={!isTextActive()}
        >
          <FaAlignLeft size={16} />
          <span className='tooltip'>چپ‌چین متن</span>
        </button>
      </div>

      {/* تنظیم فاصله بین ردیف‌ها */}
      <div className="icon-button-container">
        <button
          onClick={() => setActivePopup(activePopup === "rowSpacing" ? null : "rowSpacing")}
          className="toolbar-button row-spacing"
        >
          <FaArrowsAltV size={16} />
          <span className="tooltip">تنظیم فاصله بین ردیف‌ها</span>
        </button>
        {activePopup === "rowSpacing" && (
          <div className="popup">
            <label>
              فاصله بین ردیف‌ها:
              <input
                type="number"
                value={rowSpacing}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setRowSpacing(value);
                  }
                }}
                min="0"
                style={{width: '80px'}}
              />
              <span>px</span>
            </label>
          </div>
        )}
      </div>
      {/* تنظیم فاصله افقی بین عناصر */}
      <div className="icon-button-container">
        <button
          onClick={() => setActivePopup(activePopup === "elementGap" ? null : "elementGap")}
          className="toolbar-button element-gap"
        >
          <FaArrowsAltH size={16} />
          <span className="tooltip">تنظیم فاصله افقی بین عناصر</span>
        </button>
        {activePopup === "elementGap" && (
          <div className="popup">
            <label>
              فاصله افقی بین عناصر:
              <input
                type="number"
                value={elementGap}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0) {
                    setElementGap(value);
                  }
                }}
                min="0"
                style={{width: '80px'}}
              />
              <span>px</span>
            </label>
          </div>
        )}
      </div>

      {/* بولد کردن متن */}
      <div className='icon-button-container'>
        <button
          onClick={handleBoldToggle}
          className={`toolbar-button bold ${isBold ? 'active' : ''}`}
          disabled={!isTextActive()}
        >
          <FaBold size={16} />
          <span className='tooltip'>بولد کردن</span>
        </button>
      </div>

      {/* انتخاب رنگ متن */}
      <div className='icon-button-container'>
        <button
          onClick={() =>
            setActivePopup(activePopup === 'textColor' ? null : 'textColor')
          }
          className='toolbar-button text-color'
          disabled={!isTextActive()}
        >
          <FaPaintBrush size={16} />
          <span className='tooltip'>انتخاب رنگ متن</span>
        </button>
        {activePopup === 'textColor' && isTextActive() && (
          <input
            type='color'
            value={textColor}
            onChange={e => handleTextColorChange(e.target.value)}
            className='color-picker'
          />
        )}
      </div>

      {/* انتخاب اندازه فونت */}
      <div className='icon-button-container'>
        <button
          onClick={() =>
            setActivePopup(activePopup === 'fontSize' ? null : 'fontSize')
          }
          className='toolbar-button font-size'
          disabled={!isTextActive()}
        >
          <FaTextHeight size={16} />
          <span className='tooltip'>انتخاب اندازه فونت</span>
        </button>
        {activePopup === 'fontSize' && isTextActive() && (
          <select
            value={fontSize}
            onChange={e => handleFontSizeChange(parseInt(e.target.value))}
            className='font-size-selector'
          >
            {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60].map(size => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        )}
      </div>

      {/* حذف پاراگراف */}
      <div className='icon-button-container'>
        <button
          onClick={deleteParagraph}
          className='toolbar-button delete-paragraph'
        >
          <FaTrashAlt size={16} />
          <span className='tooltip'>حذف پاراگراف</span>
        </button>
      </div>

      {/* حذف ردیف */}
      <div className='icon-button-container'>
        <button
          onClick={deleteActiveRow}
          className='toolbar-button delete-row'
          disabled={activeRow === null}
        >
          <FaMinusCircle size={16} />
          <span className='tooltip'>حذف ردیف</span>
        </button>
      </div>

      {/* حذف عنصر */}
      <div className='icon-button-container'>
        <button
          onClick={deleteActiveElement}
          className='toolbar-button delete-element'
          disabled={activeElement === null}
        >
          <FaTrashAlt size={16} />
          <span className='tooltip'>حذف عنصر</span>
        </button>
      </div>

      {/* تغییر جهت ردیف */}
      <div className='icon-button-container'>
        <button
          onClick={toggleRowDirection}
          className='toolbar-button toggle-row-direction'
          disabled={activeRow === null}
        >
          <FaArrowsAltV size={16} />
          <span className='tooltip'>تغییر جهت ردیف</span>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
