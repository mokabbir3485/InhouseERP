using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_RequisitionDetailAdAttributeDetailBLL //: IDisposible
    {
        public inv_RequisitionDetailAdAttributeDetailBLL()
        {
            //inv_RequisitionDetailAdAttributeDetailDAO = inv_RequisitionDetailAdAttributeDetail.GetInstanceThreadSafe;
            inv_RequisitionDetailAdAttributeDetailDAO = new inv_RequisitionDetailAdAttributeDetailDAO();
        }

        public inv_RequisitionDetailAdAttributeDetailDAO inv_RequisitionDetailAdAttributeDetailDAO { get; set; }

        public List<inv_RequisitionDetailAdAttributeDetail> GetByRequisitionDetailAdAttId(long requisitionDetailAdAttId)
        {
            try
            {
                return inv_RequisitionDetailAdAttributeDetailDAO
                    .GetByRequisitionDetailAdAttId(requisitionDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_RequisitionDetailAdAttributeDetail _inv_RequisitionDetailAdAttributeDetail)
        {
            try
            {
                return inv_RequisitionDetailAdAttributeDetailDAO.Add(_inv_RequisitionDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}