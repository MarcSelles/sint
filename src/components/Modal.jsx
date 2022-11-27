const Modal = ({ show, children }) => (
  <div
    className={`absolute w-screen h-screen z-50 bg-zinc-500 bg-opacity-50 top-0 transition-all duration-700 ${
      show ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-white w-[700px] font-goose z-50">
      {children}
    </div>
  </div>
);

export default Modal;
