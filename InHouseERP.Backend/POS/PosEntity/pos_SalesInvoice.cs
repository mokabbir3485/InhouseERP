using System;

namespace SecurityEntity.POS.PosEntity
{
    public class pos_SalesInvoice
    {
        public long SalesInvoiceId { get; set; }
        public DateTime SalesInvoiceDate { get; set; }
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public string DeliveryIds { get; set; }
        public string Remarks { get; set; }
        public string VatChallanNo { get; set; }
        public int CreatorId { get; set; }
        public DateTime? CreateDate { get; set; }
        public int UpdatorId { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string PONo { get; set; }
        public string SalesOrderNo { get; set; }
        public long SalesOrderId { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public string InternalWorkOrderNo { get; set; }
        public long InternalWorkOrderId { get; set; }
        public string DeliveryNo { get; set; }
        public long DeliveryId { get; set; }
        public string SalesInvoiceNo { get; set; }
        public string ManualSalesInvoiceNo { get; set; }
        public string RequisitionNo { get; set; }
        public long RequisitionId { get; set; }
        public string IssueNo { get; set; }
        public long IssueId { get; set; }
        public string ProductionNo { get; set; }
        public long ProductionId { get; set; }
        public string StockTransferNo { get; set; }
        public long StockTransferId { get; set; }




        public bool IsOnCredit { get; set; }
        public decimal Amount { get; set; }
        public decimal CPTCost { get; set; }
        public bool IsCPT { get; set; }


        //Sale Acknowledgement
        public long SaleAcknowledgementId { get; set; }
        public string AcknowledgementNo { get; set; }
        public DateTime AcknowledgementDate { get; set; }
        public Int32 AcknowledgedBy { get; set; }
        public string AcknowledgedByName { get; set; }
        public string JvNo { get; set; }


        public Int64 InvoicePaymentId { get; set; }
        public int PaymentTypeId { get; set; }
        public int ChequeTypeId { get; set; }
        public int BankAccountId { get; set; }
        public int ReceiverBankAccountId { get; set; }
        public int CustomerBankAccountId { get; set; }
        public int MobileBankingServiceId { get; set; }
        
        public string MoneyReceiptNo { get; set; }
        public string ChequeNo { get; set; }
        public string MobileNo { get; set; }
        public string TransactionNo { get; set; }
        public DateTime? ChequeDate { get; set; }
        public bool IsCancelled { get; set; }



        public long ManualInvoiceId { get; set; }
        public string ManualInvoiceNo { get; set; }
        public DateTime ManualInvoiceDate { get; set; }
        public int CurrencyId { get; set; }
        public decimal ConversionRate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalVatAmount { get; set; }
        public string CompanyNameBilling { get; set; }
        public string AddressBilling { get; set; }
        public string PODate { get; set; }
        public string DeliveryDate { get; set; }
        public decimal AdditionalCost { get; set; }

    }
}