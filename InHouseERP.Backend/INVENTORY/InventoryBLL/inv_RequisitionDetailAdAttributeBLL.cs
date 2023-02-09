using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_RequisitionDetailAdAttributeBLL //: IDisposible
    {
        public inv_RequisitionDetailAdAttributeBLL()
        {
            //inv_RequisitionDetailAdAttributeDAO = inv_RequisitionDetailAdAttribute.GetInstanceThreadSafe;
            inv_RequisitionDetailAdAttributeDAO = new inv_RequisitionDetailAdAttributeDAO();
        }

        public inv_RequisitionDetailAdAttributeDAO inv_RequisitionDetailAdAttributeDAO { get; set; }

        public List<inv_RequisitionDetailAdAttribute> GetByRequisitionDetailId(long requisitionDetailId)
        {
            try
            {
                return inv_RequisitionDetailAdAttributeDAO.GetByRequisitionDetailId(requisitionDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_RequisitionDetailAdAttribute _inv_RequisitionDetailAdAttribute)
        {
            try
            {
                return inv_RequisitionDetailAdAttributeDAO.Add(_inv_RequisitionDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}