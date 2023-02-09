using SecurityEntity.INVENTORY.InventoryDAL;
using SecurityEntity.INVENTORY.InventoryEntity;
using System;
using System.Collections.Generic;


namespace SecurityEntity.INVENTORY.InventoryBLL
{
    public class inv_MaterialsDemandBLL
    {
        public inv_MaterialsDemandBLL()
        {
            //inv_PurchaseBillDAO = inv_PurchaseBill.GetInstanceThreadSafe;
            inv_MaterialsDemandDAO = new inv_MaterialsDemandDAO();
        }

        public inv_MaterialsDemandDAO inv_MaterialsDemandDAO { get; set; }
        public string GetMaterialsDemandNo(DateTime DemandDate)
        {
            try
            {
                return inv_MaterialsDemandDAO.GetMaterialsDemandNo(DemandDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_MaterialsDemand> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_MaterialsDemandDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_MaterialsDemandDetail> DetailGetByMaterialsDemandId(long? MaterialsDemandId)
        {
            try
            {
                return inv_MaterialsDemandDAO.DetailGetByMaterialsDemandId(MaterialsDemandId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_MaterialsDemand> GetMaterialsDemandUnApprovalList()
        {
            try
            {
                return inv_MaterialsDemandDAO.GetMaterialsDemandUnApprovalList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_MaterialsDemandDetail> MatrialDeleteById(Int64 MaterialsDemandId)
        {
            try
            {
                return inv_MaterialsDemandDAO.MatrialDeleteById(MaterialsDemandId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 Post(inv_MaterialsDemand _inv_MaterialsDemand)
        {
            try
            {
                return inv_MaterialsDemandDAO.Post(_inv_MaterialsDemand);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 ApprovalUpdate(inv_MaterialsDemand _inv_MaterialsDemand)
        {
            try
            {
                return inv_MaterialsDemandDAO.ApprovalUpdate(_inv_MaterialsDemand);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetMaterialsDemandNo()
        {
            try
            {
                return inv_MaterialsDemandDAO.GetMaterialsDemandNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 DetailPost(inv_MaterialsDemandDetail _inv_MaterialsDemandDetail)
        {
            try
            {
                return inv_MaterialsDemandDAO.DetailPost(_inv_MaterialsDemandDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
