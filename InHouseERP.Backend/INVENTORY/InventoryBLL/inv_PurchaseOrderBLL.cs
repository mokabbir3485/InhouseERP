using System;
using System.Collections.Generic;
using System.Linq;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_PurchaseOrderBLL //: IDisposible
    {
        public inv_PurchaseOrderBLL()
        {
            //inv_PurchaseOrderDAO = inv_PurchaseOrder.GetInstanceThreadSafe;
            inv_PurchaseOrderDAO = new inv_PurchaseOrderDAO();
        }

        public inv_PurchaseOrderDAO inv_PurchaseOrderDAO { get; set; }

        public Int64 GetMaxPurchaseOrderNo()
        {
            try
            {
                return inv_PurchaseOrderDAO.GetMaxPurchaseOrderNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_PurchaseOrder> GetAll(int? POId = null)
        {
            try
            {
                return inv_PurchaseOrderDAO.GetAll(POId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_PurchaseOrder GetById(int? POId = null)
        {
            try
            {
                return inv_PurchaseOrderDAO.GetAll(POId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrder> GetTopForPurchaseBill(int topQty)
        {
            try
            {
                return inv_PurchaseOrderDAO.GetTopForPurchaseBill(topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_PurchaseOrder> GetPurchaseOrderReport(int POId)
        {
            try
            {
                return inv_PurchaseOrderDAO.GetPurchaseOrderReport(POId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string Post(inv_PurchaseOrder PurchaseOrder)
        {
            try
            {
                return inv_PurchaseOrderDAO.Post(PurchaseOrder);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_PurchaseOrder> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_PurchaseOrderDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_PurchaseOrder> GetPurchaseOrderUnApprovalList()
        {
            try
            {
                return inv_PurchaseOrderDAO.GetPurchaseOrderUnApprovalList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 ApprovalUpdate(inv_PurchaseOrder inv_PurchaseOrder)
        {
            try
            {
                return inv_PurchaseOrderDAO.ApprovalUpdate(inv_PurchaseOrder);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}