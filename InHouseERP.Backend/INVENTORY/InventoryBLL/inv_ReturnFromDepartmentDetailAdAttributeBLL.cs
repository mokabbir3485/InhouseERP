using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnFromDepartmentDetailAdAttributeBLL //: IDisposible
    {
        public inv_ReturnFromDepartmentDetailAdAttributeBLL()
        {
            //inv_ReturnFromDepartmentDetailAdAttributeDAO = inv_ReturnFromDepartmentDetailAdAttribute.GetInstanceThreadSafe;
            inv_ReturnFromDepartmentDetailAdAttributeDAO = new inv_ReturnFromDepartmentDetailAdAttributeDAO();
        }

        public inv_ReturnFromDepartmentDetailAdAttributeDAO inv_ReturnFromDepartmentDetailAdAttributeDAO { get; set; }

        public List<inv_ReturnFromDepartmentDetailAdAttribute> GetByReturnDetailId(long returnDetailId)
        {
            try
            {
                return inv_ReturnFromDepartmentDetailAdAttributeDAO.GetByReturnDetailId(returnDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(inv_ReturnFromDepartmentDetailAdAttribute _inv_ReturnFromDepartmentDetailAdAttribute)
        {
            try
            {
                return inv_ReturnFromDepartmentDetailAdAttributeDAO.Add(_inv_ReturnFromDepartmentDetailAdAttribute);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}