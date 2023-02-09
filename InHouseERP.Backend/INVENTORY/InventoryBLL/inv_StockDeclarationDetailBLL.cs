using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeclarationDetailBLL //: IDisposible
    {
        public inv_StockDeclarationDetailBLL()
        {
            //inv_StockDeclarationDetailDAO = inv_StockDeclarationDetail.GetInstanceThreadSafe;
            inv_StockDeclarationDetailDAO = new inv_StockDeclarationDetailDAO();
        }

        public inv_StockDeclarationDetailDAO inv_StockDeclarationDetailDAO { get; set; }

        public List<inv_StockDeclarationDetail> GetByDeclarationId(long declarationId)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.GetByDeclarationId(declarationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclarationDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclarationDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(inv_StockDeclarationDetail _inv_StockDeclarationDetail)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.Post(_inv_StockDeclarationDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int DeleteStockDeclarationDetailId(long DeclarationDetailId)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.DeleteStockDeclarationDetailId(DeclarationDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int StockDeduct(inv_StockDeclarationDetail _inv_StockDeclarationDetail)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.StockDeduct(_inv_StockDeclarationDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long declarationDetailId)
        {
            try
            {
                return inv_StockDeclarationDetailDAO.Delete(declarationDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}