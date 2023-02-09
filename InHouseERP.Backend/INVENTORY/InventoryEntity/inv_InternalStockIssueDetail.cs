using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SecurityEntity.INVENTORY.InventoryEntity
{
    public class inv_InternalStockIssueDetail
    {
        public Int64 StockIssueDetailId { get; set; }
        public Int64 StockIssueId { get; set; }
        public Int64 ItemId { get; set; }
        public int MaterialTypeId { get; set; }
        public int UnitId { get; set; }
        public decimal Quantity { get; set; }
    }
}
