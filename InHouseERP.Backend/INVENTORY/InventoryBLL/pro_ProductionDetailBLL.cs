using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class pro_ProductionDetailBLL //: IDisposible
    {
        public pro_ProductionDetailBLL()
        {
            //pro_ProductionDetailDAO = pro_ProductionDetail.GetInstanceThreadSafe;
            pro_ProductionDetailDAO = new pro_ProductionDetailDAO();
        }

        public pro_ProductionDetailDAO pro_ProductionDetailDAO { get; set; }

        public List<xRpt_pro_ProductionReport> GetProductionReport(long ProductionId)
        {
            try
            {
                return pro_ProductionDetailDAO.GetProductionReport(ProductionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> GetAll()
        {
            try
            {
                return pro_ProductionDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pro_ProductionDetailDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return pro_ProductionDetailDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(pro_ProductionDetail _pro_ProductionDetail)
        {
            try
            {
                return pro_ProductionDetailDAO.Add(_pro_ProductionDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(pro_ProductionDetail _pro_ProductionDetail)
        {
            try
            {
                return pro_ProductionDetailDAO.Update(_pro_ProductionDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long productionDetailId)
        {
            try
            {
                return pro_ProductionDetailDAO.Delete(productionDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> ProductionWiseDepartmentAndProductionId(Int64 ProductionId, int DepartmentId)
        {
            try
            {
                return pro_ProductionDetailDAO.ProductionWiseDepartmentAndProductionId(ProductionId, DepartmentId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_ProductionDetail> ProductionHistoryReport(DateTime FormDate, DateTime ToDate)
        {
            try
            {
                return pro_ProductionDetailDAO.ProductionHistoryReport(FormDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}