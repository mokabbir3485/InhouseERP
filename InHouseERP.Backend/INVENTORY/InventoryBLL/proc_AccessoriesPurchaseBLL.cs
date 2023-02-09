using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class proc_AccessoriesPurchaseBLL
    {
        public proc_AccessoriesPurchaseBLL()
        {
            proc_AccessoriesPurchaseDAO = new proc_AccessoriesPurchaseDAO();
        }

        public proc_AccessoriesPurchaseDAO proc_AccessoriesPurchaseDAO { get; set; }


        public Int64 GetMaxAccessoriesPurchaseNo()
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.GetMaxAccessoriesPurchaseNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_AccessoriesPurchase> GetAllAccessoriesPurchase(int? PurchaseId = null)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.GetAllAccessoriesPurchase(PurchaseId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int PostAccessoriesPurchase(proc_AccessoriesPurchase proc_AccessoriesPurchase)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.PostAccessoriesPurchase(proc_AccessoriesPurchase);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int PostAccessoriesPurchaseDetail(proc_AccessoriesPurchaseDetail proc_AccessoriesPurchaseDetail)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.PostAccessoriesPurchaseDetail(proc_AccessoriesPurchaseDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_AccessoriesPurchaseDetail> GetAccessoriesPurchaseDetailByPurchaseId(int? PurchaseId = null)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.GetAccessoriesPurchaseDetailByPurchaseId(PurchaseId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_proc_AccessoriesPurchase> GetAccessoriesPurchaseDetailForReportByPurchaseId(int? PurchaseId = null)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.GetAccessoriesPurchaseDetailForReportByPurchaseId(PurchaseId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_AccessoriesPurchase> GetPagedAccessoriesPurchase(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.GetPagedAccessoriesPurchase(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeletedAccessoriesPurchaseDetailByPurchaseDetailId(int PurchaseDetailId)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.DeletedAccessoriesPurchaseDetailByPurchaseDetailId(PurchaseDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_AccessoriesPurchase> GetAccessoriesPurchaseNoExist(string PurchaseNo)
        {
            try
            {
                return proc_AccessoriesPurchaseDAO.GetAccessoriesPurchaseNoExist(PurchaseNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
