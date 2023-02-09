using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_PurchaseRequisitionBLL //: IDisposible
    {
        public inv_PurchaseRequisitionBLL()
        {
            //inv_PurchaseRequisitionDAO = inv_PurchaseRequisition.GetInstanceThreadSafe;
            inv_PurchaseRequisitionDAO = new inv_PurchaseRequisitionDAO();
        }

        public inv_PurchaseRequisitionDAO inv_PurchaseRequisitionDAO { get; set; }

        public List<inv_PurchaseRequisition> GetAll()
        {
            try
            {
                return inv_PurchaseRequisitionDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseRequisition> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_PurchaseRequisitionDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseRequisition> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_PurchaseRequisitionDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(inv_PurchaseRequisition _inv_PurchaseRequisition)
        {
            try
            {
                return inv_PurchaseRequisitionDAO.Add(_inv_PurchaseRequisition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_PurchaseRequisition _inv_PurchaseRequisition)
        {
            try
            {
                return inv_PurchaseRequisitionDAO.Update(_inv_PurchaseRequisition);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long purchaseRequisitionId)
        {
            try
            {
                return inv_PurchaseRequisitionDAO.Delete(purchaseRequisitionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}