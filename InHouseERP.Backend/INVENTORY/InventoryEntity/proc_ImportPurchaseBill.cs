using System;
using DbExecutor;

namespace InventoryEntity
{
    public class proc_ImportPurchaseBill : IEntityBase
    {
            public long PBId { get; set; }
        public long POId { get; set; }
            public string LCorPONo { get; set; }
            public string PBNo { get; set; }
            public DateTime PBDate { get; set; }
            public long SupplierId { get; set; }
            public int PreparedById { get; set; }
            public string ShipmentInfo { get; set; }
        public string PBIDAndNO { get; set; }

            public int PriceTypeId { get; set; }
            public string Remarks { get; set; }
            public string PreparedBy { get; set; }
            public string SupplierName { get; set; }
        public string ItemName { get; set; }
            public string PriceTypeName { get; set; }
            public bool IsApproved { get; set; }
        public bool IsLocal { get; set; }
        public int ApprovedBy { get; set; }
            public DateTime ApprovedDate { get; set; }
        public string VoucherNo { get; set; }
        public decimal Amount { get; set; }
        public decimal TotalDue { get; set; }
            public decimal AdditionDiscount { get; set; }
            public string Port { get; set; }
            public string NID { get; set; }
            public string Address { get; set; }
            public bool isRawMaterials { get; set; }
            public bool isVDS { get; set; }
        public string ChallanNo { get; set; }
            public decimal TotalAmount { get; set; }
            public decimal TotalAmountAfterDiscount { get; set; }
        public bool Islocal { get; set; }

            public string InvoiceNo { get; set; }
            public DateTime InvoiceDate { get; set; }
            public DateTime LCorPODate { get; set; }
        public string BondNo { get; set; }
            public long BondId { get; set; }
            public DateTime BondDate { get; set; }
            public string ImportPermitNo { get; set; }
            public DateTime ImportPermitDate { get; set; }
            public string BillOfEntryNo { get; set; }
            public DateTime BillOfEntryDate { get; set; }
            public int CreatorId { get; set; }
            public DateTime CreateDate { get; set; }
            public int UpdatorId { get; set; }
            public DateTime UpdateDate { get; set; }

        ///////////////////PurchaseAcknowledgement
        //public long PurchaseAcknowledgementId { get; set; }
        //public string AcknowledgementNo { get; set; }
        //public DateTime AcknowledgementDate { get; set; }
        //public Int32 AcknowledgedBy { get; set; }
        //public string AcknowledgedByName { get; set; }
        //public string JvNo { get; set; }
            public Int64 SRId { get; set; }
            public bool IsLocalPurchase { get; set; }
            public bool StockRecivedReference { get; set; }
            public int BranchId { get; set; }


            public decimal Qty { get; set; }

           
            public decimal TotalPriceInBDT { get; set; }

            public int CurrencyId { get; set; }
            public decimal ConversionRate { get; set; }
            public int IsReceived { get; set; }
            public bool IsCancelled { get; set; }
            public string ReceivedStatus { get; set; }
    }
}