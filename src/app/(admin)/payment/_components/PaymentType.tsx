import React from 'react'

const PaymentType = ({ tagName }: { tagName: string }) => {
  return (
    <>
      {tagName === "full-payment" ? (
        <span className="bg-teal-200 text-teal-950 py-1 px-4 text-[11px] font-medium rounded-full">
          Paid
        </span>
      ) : tagName === "emi" ? (
        <span className="bg-yellow-200 text-yellow-950 py-1 px-4 text-[11px] font-medium rounded-full">
          EMI
        </span>
      ) : null}
    </>
  )
}

export default PaymentType