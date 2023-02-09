using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_ReturnFromDepartmentDetailAdAttributeDetailBLL //: IDisposible
    {
        public inv_ReturnFromDepartmentDetailAdAttributeDetailBLL()
        {
            //inv_ReturnFromDepartmentDetailAdAttributeDetailDAO = inv_ReturnFromDepartmentDetailAdAttributeDetail.GetInstanceThreadSafe;
            inv_ReturnFromDepartmentDetailAdAttributeDetailDAO =
                new inv_ReturnFromDepartmentDetailAdAttributeDetailDAO();
        }

        public inv_ReturnFromDepartmentDetailAdAttributeDetailDAO inv_ReturnFromDepartmentDetailAdAttributeDetailDAO
        {
            get;
            set;
        }

        public List<inv_ReturnFromDepartmentDetailAdAttributeDetail> GetByReturnDetailAdAttId(long returnDetailAdAttId)
        {
            try
            {
                return inv_ReturnFromDepartmentDetailAdAttributeDetailDAO.GetByReturnDetailAdAttId(returnDetailAdAttId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(
            inv_ReturnFromDepartmentDetailAdAttributeDetail _inv_ReturnFromDepartmentDetailAdAttributeDetail)
        {
            try
            {
                return inv_ReturnFromDepartmentDetailAdAttributeDetailDAO.Add(
                    _inv_ReturnFromDepartmentDetailAdAttributeDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}