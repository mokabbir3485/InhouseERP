using System;

namespace InventoryEntity
{
    public class inv_StockTransfer
    {
        public long StockTransferId { get; set; }
        public string StockTransferTypeName { get; set; }
        public string StockTransferNo { get; set; }
        public DateTime StockTransferDate { get; set; }
        public long StockTransferTypeId { get; set; }
        public int FromStore { get; set; }
        public int ToStore { get; set; }
        public int IssuedBy { get; set; }
        public int ReceivedBy { get; set; }
        public int CreatorId { get; set; }
        public DateTime UpdateDate { get; set; }
        public int UpdatorId { get; set; }
        public string FromStoreName { get; set; }
        public string ToStoreName { get; set; }
        public string IssuedByName { get; set; }
        public string ReceivedByName { get; set; }
        public string Remarks { get; set; }
        public int MaterialTypeId { get; set; }

        public int ProductionId { get; set; }
        public int InternalWorkOrderId { get; set; }

        public bool IsCancelled { get; set; }
    }
}