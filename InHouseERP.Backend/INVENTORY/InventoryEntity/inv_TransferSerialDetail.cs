using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryEntity
{
    public class inv_TransferSerialDetail
    {
        public long HardwareStockSerialId { get; set; }
        public string SerialNo { get; set; }
        public int WarrentyInDays { get; set; }
        public int FromDepartmentId { get; set; }
        public int ToDepartmentId { get; set; }
        public long ItemId { get; set; }
    }
}
