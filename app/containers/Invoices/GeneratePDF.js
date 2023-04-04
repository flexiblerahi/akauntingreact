import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const GeneratePDF = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice',
    onAfterPrint: () => alert("print Success")
  })
  return (
    <>
      <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
        <h1>Invoice</h1>
      </div>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default GeneratePDF;