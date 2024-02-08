import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';

export const successAlertModal = (text="", title = "عملیات موفق", icon="success") => {
  return Swal.fire({
    // position,
    icon,
    text,
    title,
    showConfirmButton: true,
    // timer: 3000,
    backdrop: true,
  });
};
export const errorAlertModal = (text="", title = "عملیات ناموفق", icon="error") => {
  return Swal.fire({
    // position,
    icon,
    text,
    title,
    showConfirmButton: true,
    // timer: 3000,
    backdrop: true,
  });
};

export const showToast = (text, icon="info", position="top-right", autoClose=10000)=>{
  return toast(text, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: icon,
    rtl: true
  });
}

export const errorToast = (text="عملیات ناموفق", icon="error", position="top-right", autoClose=5000) => {
  return showToast(text, icon, position, autoClose)
};

export const successToast = (text="عملیات موفق", icon="success", position="top-right", autoClose=5000) => {
  return showToast(text, icon, position, autoClose)
};

export const successToast_v1 = (text="عملیات موفق", icon="error",position="top-right", autoClose=5000) => {
  return toast.success(text, {
    theme: "colored", icon: ({theme, type}) =>  "✔️"
  }, position, autoClose);
  
};

export const errorToast_v1 = (text="عملیات ناموفق", icon="error",position="top-right", autoClose=5000) => {
  return toast.error(text, {
     icon: ({theme, type}) =>  "❌"
  }, position, autoClose);
  
};

export const upToast_v1 = (text="اطلاع رسانی", icon="error",position="top-right", autoClose=5000) => {
  return toast.info(text, {
    theme: "colored", icon: ({theme, type}) =>  "🚀"
  }, position, autoClose);
  
};

export const confirmAlert = (
  title = "آیا مطمئن هستید",
  text = "",
  icon = "info",
  confirmButtonColor = "red",
  confirmButtonText = "تایید"
) => {
  return Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: `انصراف`,
    confirmButtonColor,
    cancelButtonColor: "gray",
  });
};

function Notify() {
    const notify = () => {
        //successAlertModal("Mahdi Ghanati :-)")
        //successToast()
        errorToast_v1()
        upToast_v1()
        
    };
    return (
        <div>
            <button onClick={notify}>Click Me!</button>
            <ToastContainer icon={false}/>
        </div>
    );
}
 
export default Notify