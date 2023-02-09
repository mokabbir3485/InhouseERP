using System;

namespace InventoryEntity
{
    public class inv_StoreWiseItemReorderLevelLog
    {
        public long ReorderLevelLogId { get; set; }
        public int DepartmentId { get; set; }
        public int ItemId { get; set; }
        public int ReorderUnitId { get; set; }
        public int MinReorderLevel { get; set; }
        public int MaxReorderLevel { get; set; }
        public DateTime LogDate { get; set; }
        public string ItemName { get; set; }
        public string UnitName { get; set; }
    }
}