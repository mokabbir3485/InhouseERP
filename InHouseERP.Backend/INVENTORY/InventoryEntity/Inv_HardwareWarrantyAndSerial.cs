using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
    public class Inv_HardwareWarrantyAndSerial
    {
        public long HardwareStockSerialId { get; set; }
        public long HardwareStockId { get; set; }
        public long ItemId { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int WarrentyInDays { get; set; }
        public string SerialNo { get; set; }
    }
}
