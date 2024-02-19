import React, { useEffect, useRef, useState} from "react";
import { successToast_v2 } from "./Notify";
import { ToastContainer} from 'react-toastify';
let modalsPositionInfo;
export default function DraggableModal({
  children,
  title,
  name,
  width,
  height,
  minWidth,
  minHeight,
  zIndex,
  closeBtnCallback,
  isShow,
  fixable = true,
  left,
  top,
  headColor,
  backColor
}) {

  const panRef = useRef(null);
  const parentRef = useRef(null);
  const resizeRef = useRef(null);

  const handleZIndex = () => {
    const allFloated = document.querySelectorAll(".floated_modal");
    const zIndexes = Array.from(allFloated).map(elem=>window.getComputedStyle(elem).getPropertyValue("z-index"))
    const max = Math.max(...zIndexes)
    parentRef.current.style.zIndex = parseInt(max) + 1;
  };

  const handleFixModal = ()=>{
    const lastHeight = parentRef.current.style.height
    const lastWidth = parentRef.current.style.width
    const lastLeft = parentRef.current.style.left
    const lasttop = parentRef.current.style.top

    const modalPosition = {
      height: lastHeight,
      width: lastWidth,
      left: lastLeft,
      top: lasttop,
    }

    const modalsPositionInfoSTR = localStorage.getItem("modalsPositionInfo")
    if (modalsPositionInfoSTR) {      
      modalsPositionInfo = JSON.parse(modalsPositionInfoSTR)
      modalsPositionInfo[name] = modalPosition
    }else{
      modalsPositionInfo = {
        [name]: modalPosition
      }
    }
    localStorage.setItem("modalsPositionInfo", JSON.stringify(modalsPositionInfo))
    successToast_v2('تثبیت شد')
  }

  const hendleReturnPosition = ()=>{
    if (getFixedValue("height")) {
      parentRef.current.style.height = getFixedValue("height")
      parentRef.current.style.width = getFixedValue("width")
      parentRef.current.style.top = getFixedValue("top")
      parentRef.current.style.left = getFixedValue("left")
    }
  }

  const getFixedValue = (param)=>{
    const localStorageModalInfo = JSON.parse(localStorage.getItem("modalsPositionInfo"))
    if (localStorageModalInfo) {      
      const localStorageModal = localStorageModalInfo[name]
      if (localStorageModal) return localStorageModal[param]
    }
    return undefined
  }
  
  useEffect(()=>{
    if (isShow) {
      handleZIndex()
    }
  },[isShow])

  useEffect(() => {
    let mouseDown = false;
    let resizable = false;
    let moveFirsts = {
      cursurX: null,
      cursurY: null,
      elemX: null,
      elemY: null,
    };
    panRef.current.addEventListener("mousedown", (e) => {
      moveFirsts.cursurX = e.x;
      moveFirsts.cursurY = e.y;
      moveFirsts.elemX = parentRef.current.offsetLeft;
      moveFirsts.elemY = parentRef.current.offsetTop;
      mouseDown = true;
      resizable = false;
      handleZIndex();
    });
    resizeRef.current.addEventListener("mousedown", (e) => {
      handleZIndex();
      mouseDown = false;
      resizable = true;
    });

    document.addEventListener("mouseup", (e) => {
      // setMouseDown(false);
      mouseDown = false;
      resizable = false;
    });

    document.addEventListener("mousemove", (e) => {
      if (mouseDown) {
        const moveX = e.x - moveFirsts.cursurX;
        const moveY = e.y - moveFirsts.cursurY;

        parentRef.current.style.left = moveFirsts.elemX + moveX + "px";
        parentRef.current.style.top = moveFirsts.elemY + moveY + "px";
      }
      if (resizable) {
        parentRef.current.getBoundingClientRect();
        const parentX = parentRef.current.offsetLeft;
        const parentY = parentRef.current.offsetTop;
        parentRef.current.style.width = e.x - parentX + "px";
        parentRef.current.style.height = e.y - parentY + "px";
      }
    });
  }, []);

  return (      
    <div
      style={{
        zIndex: zIndex || 2,
        height: getFixedValue("height") || height || "250px",
        width: getFixedValue("width") || width || "250px",
        minWidth: minWidth || "250px",
        minHeight: minHeight || "250px",
        display: isShow ? "block" : "none",
        left: getFixedValue("left") || left || 6 , 
        top: getFixedValue("top") || top || 57 ,
      }}
      onClick={handleZIndex}
      ref={parentRef}
      className="floated_modal animate__animated animate__zoomIn animate__faster rounded_top_3"
    >
      <div
        ref={panRef}
        className={`title-header ${headColor || "alert-secondary"} `}
      >
        {title || "title"}
      </div>
      <i
        ref={resizeRef}
        className="floated_modal_resize_icon"
      >
        <svg width="24px" height="24px" viewBox="0 0 24 24" transform="rotate(43 0 0)" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15L15 21M21 8L8 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </i>
      <span className="floated_modal_action_icons">
        {
          getFixedValue("height") && (
            <i
            onClick={hendleReturnPosition}
            className="icon-back hoverable_text"
            title="بازگشت به موقعیت تثبیت شده"
            >
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </i>
          )
        }
        {
          fixable && (
            <i
            onClick={handleFixModal}
            className="icon-save hoverable_text"
            title="تثبیت موقعیت پنجره مدال"
            >
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.33008 14.49L9.71008 11.4C10.0501 10.96 10.6801 10.88 11.1201 11.22L12.9501 12.66C13.3901 13 14.0201 12.92 14.3601 12.49L16.6701 9.51001" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>  
              <ToastContainer icon={false}/>           
            </i>
          )
        }
        <i
        onClick={closeBtnCallback}
        className="icon-close hoverable_text"
        >
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </i>
      </span>
      <div className={`floated_modal_content p-3 ${backColor || ""}`} style={{overflow:"auto"}}>{children}</div>

    </div>
  );
}
