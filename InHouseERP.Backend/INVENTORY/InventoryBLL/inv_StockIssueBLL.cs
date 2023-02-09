using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockIssueBLL //: IDisposible
    {
        public inv_StockIssueBLL()
        {
            //inv_StockIssueDAO = inv_StockIssue.GetInstanceThreadSafe;
            inv_StockIssueDAO = new inv_StockIssueDAO();
        }

        public inv_StockIssueDAO inv_StockIssueDAO { get; set; }

        public List<inv_StockIssue> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockIssueDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_InternalStockIssue> InternalStockIssuedGetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
           string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockIssueDAO.InternalStockIssuedGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<inv_StockIssue> GetAll()
        {
            try
            {
                return inv_StockIssueDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public inv_StockIssue GetById(long issueId)
        {
            try
            {
                return inv_StockIssueDAO.GetAll(issueId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetTopForReturn(string whereCondition, string topQty)
        {
            try
            {
                return inv_StockIssueDAO.GetTopForReturn(whereCondition, topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetForDashboard()
        {
            try
            {
                return inv_StockIssueDAO.GetForDashboard();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockIssue> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockIssueDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<xrpt_inv_StockIssueHistory> GetByIssueHistory(DateTime FromDate, DateTime ToDate)
        {
            try
            {
                return inv_StockIssueDAO.GetByIssueHistory(FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public string Add(inv_StockIssue _inv_StockIssue)
        {
            try
            {
                return inv_StockIssueDAO.Add(_inv_StockIssue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string AddInternalStockIssue(inv_InternalStockIssue _inv_StockIssue)
        {
            try
            {
                return inv_StockIssueDAO.AddInternalStockIssue(_inv_StockIssue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockIssue _inv_StockIssue)
        {
            try
            {
                return inv_StockIssueDAO.Update(_inv_StockIssue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(inv_StockIssue _inv_StockIssue)
        {
            try
            {
                return inv_StockIssueDAO.UpdateApprove(_inv_StockIssue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxIssueNoByDate(DateTime issueDate)
        {
            try
            {
                return inv_StockIssueDAO.GetMaxIssueNoByDate(issueDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxIssueNumber()
        {
            try
            {
                return inv_StockIssueDAO.GetMaxIssueNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_inv_Report> GetMaterialDemandedIssuedForReport(Int64 ReportId, string ReportType)
        {
            try
            {
                return inv_StockIssueDAO.GetMaterialDemandedIssuedForReport(ReportId, ReportType);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_InternalStockIssue> InternalStockIssueIssuedForReport(Int64 StockIssueId)
        {
            try
            {
                return inv_StockIssueDAO.InternalStockIssueIssuedForReport(StockIssueId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetMaxIssueNo()
        {
            try
            {
                return inv_StockIssueDAO.GetMaxIssueNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 InternalStockIssueGetMaxStockIssueNumber()
        {
            try
            {
                return inv_StockIssueDAO.InternalStockIssueGetMaxStockIssueNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
    }
}