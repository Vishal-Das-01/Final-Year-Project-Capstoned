import styles from "./ForgotPasswordLoadingBtn.module.css";

export default function ForgotPasswordLoadingBtn() {
  return (
    <div
      className={`${styles.btnContainer} h-16 flex items-center justify-center py-3`}
    >
        <button
          type="submit"
          disabled
          className={`${styles.forgotPasswordLoadingBtn} items-center justify-center w-full h-full font-montserrat font-semibold rounded-lg text-base tracking-widest text-white bg-black border-4 border-black`}
        >
         
          <div className="flex items-center justify-center">
         
            <div className="border-t-4 border-white border-solid rounded-full h-6 w-6 animate-spin"></div>
         
          </div>
        
        </button>
     
    
    </div>
  );
}
