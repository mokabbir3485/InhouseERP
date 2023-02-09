using System;
using System.Collections.Generic;
using System.Data.Common;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_JumboStockIssueBLL
    {
        public inv_JumboStockIssueBLL()
        {
            inv_JumboStockIssueDAO = new inv_JumboStockIssueDAO();
        }

        public inv_JumboStockIssueDAO inv_JumboStockIssueDAO { get; set; }

        public string Post(inv_JumboStockIssue _inv_JumboStockIssue)
        {
            try
            {
                return inv_JumboStockIssueDAO.Post(_inv_JumboStockIssue);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long PostJumboStockIssueDetail(inv_JumboStockIssueDetail _inv_JumboStockIssueDetail)
        {
            try
            {
                return inv_JumboStockIssueDAO.PostJumboStockIssueDetail(_inv_JumboStockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long AddDetail(inv_JumboStockIssueDetail _inv_JumboStockIssueDetail)
        {
            try
            {
                return inv_JumboStockIssueDAO.AddDetail(_inv_JumboStockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateDetail(inv_JumboStockIssueDetail _inv_JumboStockIssueDetail)
        {
            try
            {
                return inv_JumboStockIssueDAO.UpdateDetail(_inv_JumboStockIssueDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_JumboStockIssueDetail> JumboStockIssueDetailGetByJIssueId(long JIssueId)
        {
            try
            {
                return inv_JumboStockIssueDAO.JumboStockIssueDetailGetByJIssueId(JIssueId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

        public List<inv_JumboStockIssueDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_JumboStockIssueDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxJumboStockIssueNumber()
        {
            try
            {
                return inv_JumboStockIssueDAO.GetMaxJumboStockIssueNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetMaxJumboIssueNo()
        {
            try
            {
                return inv_JumboStockIssueDAO.GetMaxJumboIssueNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}