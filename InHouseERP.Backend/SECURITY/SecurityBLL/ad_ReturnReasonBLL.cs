using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ReturnReasonBLL //: IDisposible
    {
        public ad_ReturnReasonBLL()
        {
            //ad_ReturnReasonDAO = ad_ReturnReason.GetInstanceThreadSafe;
            ad_ReturnReasonDAO = new ad_ReturnReasonDAO();
        }

        public ad_ReturnReasonDAO ad_ReturnReasonDAO { get; set; }

        public List<ad_ReturnReason> GetAll()
        {
            try
            {
                return ad_ReturnReasonDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ReturnReason> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_ReturnReasonDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_ReturnReason> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_ReturnReasonDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_ReturnReason _ad_ReturnReason)
        {
            try
            {
                return ad_ReturnReasonDAO.Add(_ad_ReturnReason);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_ReturnReason _ad_ReturnReason)
        {
            try
            {
                return ad_ReturnReasonDAO.Update(_ad_ReturnReason);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int ReturnReasonId)
        {
            try
            {
                return ad_ReturnReasonDAO.Delete(ReturnReasonId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}