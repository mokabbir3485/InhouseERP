using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class inv_StockDeclarationBLL //: IDisposible
    {
        public inv_StockDeclarationBLL()
        {
            //inv_StockDeclarationDAO = inv_StockDeclaration.GetInstanceThreadSafe;
            inv_StockDeclarationDAO = new inv_StockDeclarationDAO();
        }

        public inv_StockDeclarationDAO inv_StockDeclarationDAO { get; set; }

        public List<inv_StockDeclaration> GetAll(long? declarationId = null)
        {
            try
            {
                return inv_StockDeclarationDAO.GetAll(declarationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_StockDeclaration> StockDeclarationDetailGetById(long declarationId)
        {
            try
            {
                return inv_StockDeclarationDAO.StockDeclarationDetailGetById(declarationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclaration> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return inv_StockDeclarationDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockDeclaration> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return inv_StockDeclarationDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Post(inv_StockDeclaration _inv_StockDeclaration)
        {
            try
            {
                return inv_StockDeclarationDAO.Post(_inv_StockDeclaration);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(inv_StockDeclaration _inv_StockDeclaration)
        {
            try
            {
                return inv_StockDeclarationDAO.Update(_inv_StockDeclaration);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public long GetMaxStockDeclarationNumber()
        {
            try
            {
                return inv_StockDeclarationDAO.GetMaxStockDeclarationNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int UpdateApprove(inv_StockDeclaration _inv_StockDeclaration)
        {
            try
            {
                return inv_StockDeclarationDAO.UpdateApprove(_inv_StockDeclaration);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long declarationId)
        {
            try
            {
                return inv_StockDeclarationDAO.Delete(declarationId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}