using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_RequisitionDetailBLL //: IDisposible
    {
        public inv_RequisitionDetailBLL()
        {
            //inv_RequisitionDetailDAO = inv_RequisitionDetail.GetInstanceThreadSafe;
            inv_RequisitionDetailDAO = new inv_RequisitionDetailDAO();
        }

        public inv_RequisitionDetailDAO inv_RequisitionDetailDAO { get; set; }

        public int Add(inv_RequisitionDetail _inv_RequisitionDetail)
        {
            try
            {
                return inv_RequisitionDetailDAO.Add(_inv_RequisitionDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_RequisitionDetail _inv_RequisitionDetail)
        {
            try
            {
                return inv_RequisitionDetailDAO.Update(_inv_RequisitionDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_RequisitionDetail> GetByRequisitionId(long requisitionId)
        {
            try
            {
                return inv_RequisitionDetailDAO.GetByRequisitionId(requisitionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}