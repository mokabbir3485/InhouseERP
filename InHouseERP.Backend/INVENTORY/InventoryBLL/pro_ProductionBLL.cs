using System;
using System.Collections.Generic;
using System.Data.Common;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class pro_ProductionBLL //: IDisposible
    {
        public pro_ProductionBLL()
        {
            //pro_ProductionDAO = pro_Production.GetInstanceThreadSafe;
            pro_ProductionDAO = new pro_ProductionDAO();
        }

        public pro_ProductionDAO pro_ProductionDAO { get; set; }


        public List<pro_Production> MachineGetAll()
        {
            try
            {
                return pro_ProductionDAO.MachineGetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_Production> GetAll()
        {
            try
            {
                return pro_ProductionDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_Production> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return pro_ProductionDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pro_Production> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return pro_ProductionDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(pro_Production _pro_Production)
        {
            try
            {
                return pro_ProductionDAO.Add(_pro_Production);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(pro_Production _pro_Production)
        {
            try
            {
                return pro_ProductionDAO.Update(_pro_Production);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long productionId)
        {
            try
            {
                return pro_ProductionDAO.Delete(productionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxProductionNumber()
        {
            try
            {
                return pro_ProductionDAO.GetMaxProductionNumber();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public DbDataReader GetMaxProductionNumber()
        //{
        //    try
        //    {
        //        return pro_ProductionDAO.GetMaxProductionNumber();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}