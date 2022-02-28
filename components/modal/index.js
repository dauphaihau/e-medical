import Button from "../button";

const Modal = ({children}) => {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Terms of Service</h3>
          <button type="button" data-modal-toggle="defaultModal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new consumer privacy laws
            for its citizens, companies around the world are updating their terms of service
            agreements to comply.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
            May 25 and is meant to ensure a common set of data rights in the European Union. It
            requires organizations to notify users as soon as possible of high-risk data breaches
            that could personally affect them.
          </p>
          {/*{children}*/}
          <Button className='mr-4'>Lưu</Button>
          <Button>Huỷ</Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;