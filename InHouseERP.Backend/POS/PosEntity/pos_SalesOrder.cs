using System;

namespace PosEntity
{
    public class pos_SalesOrder //: IEntityBase
    {
        public Int64 SalesOrderId { get; set; }
        public Int64 CommercialInvoiceId { get; set; }
        public Int32 BranchId { get; set; }
        public Int32 FactoryId { get; set; }
        public Int32 CompanyId { get; set; }
        public Int32 PriceTypeId { get; set; }
        public Int32 ItemId { get; set; }
        public string SalesOrderNo { get; set; }
        public string DeliveryNo { get; set; }
        public string FactoryName { get; set; }
        public string BranchName { get; set; }
        public string ItemName { get; set; }
        public string ItemCode { get; set; }
        public string MaterialTypeCode { get; set; }
        public string Size { get; set; }
        public string ReferenceNo { get; set; }
        public DateTime SalesOrderDate { get; set; }
        public Int32 PreparedById { get; set; }
        public string Remarks { get; set; }
        public string POReferenceIds { get; set; }
        public Int32 CreatorId { get; set; }
        //public DateTime CreateDate { get; set; }
        public Int32 UpdatorId { get; set; }
        public Int32 QtyPerRoll { get; set; }
        //public DateTime UpdateDate { get; set; }
        public string CompanyName { get; set; }
        public string RefEmployeeName { get; set; }
        public string PreparedByName { get; set; }
        public string ContactPerson { get; set; }
        public string RollDirection { get; set; }
        public string Ups { get; set; }
        public Decimal Amount { get; set; }
        
        public Decimal PricePerPCS { get; set; }
        public bool IsAcknowledged { get; set; }
        public bool IsAmendment { get; set; }
        public int IsInvoice { get; set; }
        public Int32? AcknowledgedBy { get; set; }
        public DateTime? AcknowledgedDate { get; set; }
        public string VoucherNo { get; set; }
        public Decimal TotalAdjustment { get; set; }
        public Decimal unitperpackage { get; set; }
        public Decimal orderprice { get; set; }
        public Decimal Core { get; set; }
        public Decimal packagepercontainer { get; set; }
        public Decimal TotalDue { get; set; }
        public Decimal? ConversionRate { get; set; }
        public DateTime? InvoiceDueDate { get; set; }
        public DateTime? SalesInvoiceDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string CompanyNameBilling { get; set; }
        public string AddressBilling { get; set; }
        public string CompanyNameDelivery { get; set; }
        public string AddressDelivery { get; set; }
        public DateTime? PODate { get; set; }
        public string CurrencyType { get; set; }
        public string SalesOrderType { get; set; }
        public string DocStatus { get; set; }
        public int DocStatusId { get; set; }
        public string SalesOrderIDAndNO { get; set; }
        public string CurrencyShort { get; set; }
        public bool IsChecked { get; set; }
        public bool IsCPT { get; set; }
        public Decimal? CPTCost { get; set; }
        public Decimal? AmountWithCPT { get; set; }
        public int IsNonSO { get; set; }
        public Int32 DepartmentId { get; set; }
        public string AttachmentName { get; set; }
        public Int32 CurrencyId { get; set; }
        public string AmountWithCurrency { get; set; }
        public bool IsCancelled { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal CompanySubTotal { get; set; }

        public decimal OrderPriceBDT { get; set; }
        public decimal OrderQty { get; set; }
        public string UnitName { get; set; }

        public decimal AmountBDT { get; set; }
        public decimal PaidAmount { get; set; }
        public decimal DueAmount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string EmployeeName { get; set; }
        public string SalesInvoiceNo { get; set; }
        public string PaymentNo { get; set; }
        public int OverDueByDays { get; set; }
        public decimal PaidVAT { get; set; }
        public decimal PaidAIT { get; set; }
        public decimal AdjustedAmount { get; set; }
        public decimal AdditionalCost { get; set; }
    }
}
