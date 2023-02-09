using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_InternalWorkOrderDetailReportBLL
    {
        public inv_InternalWorkOrderDetailReportBLL()
        {
            //inv_InternalWorkOrderDetailDAO = inv_InternalWorkOrderDetail.GetInstanceThreadSafe;
            inv_InternalWorkOrderDetailReportDAO = new inv_InternalWorkOrderDetailReportDAO();
        }

        public inv_InternalWorkOrderDetailReportDAO inv_InternalWorkOrderDetailReportDAO { get; set; }

        public List<inv_InternalWorkOrderReport> GetByInternalWorkOrderId(long internalWorkOrderId)
        {
            try
            {
                return inv_InternalWorkOrderDetailReportDAO.GetByInternalWorkOrderId(internalWorkOrderId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}