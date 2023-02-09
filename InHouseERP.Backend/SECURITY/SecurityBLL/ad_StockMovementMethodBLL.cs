using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_StockMovementMethodBLL //: IDisposible
    {
        public ad_StockMovementMethodBLL()
        {
            //ad_StockMovementMethodDAO = ad_StockMovementMethod.GetInstanceThreadSafe;
            ad_StockMovementMethodDAO = new ad_StockMovementMethodDAO();
        }

        public ad_StockMovementMethodDAO ad_StockMovementMethodDAO { get; set; }

        public List<ad_StockMovementMethod> GetAll()
        {
            try
            {
                return ad_StockMovementMethodDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockMovementMethod> GetAllActive()
        {
            try
            {
                return ad_StockMovementMethodDAO.GetAllActive();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockMovementMethod> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_StockMovementMethodDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_StockMovementMethod> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ad_StockMovementMethodDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_StockMovementMethod _ad_StockMovementMethod)
        {
            try
            {
                return ad_StockMovementMethodDAO.Add(_ad_StockMovementMethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_StockMovementMethod _ad_StockMovementMethod)
        {
            try
            {
                return ad_StockMovementMethodDAO.Update(_ad_StockMovementMethod);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int MovementMethodId)
        {
            try
            {
                return ad_StockMovementMethodDAO.Delete(MovementMethodId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}