using System;
using System.Collections.Generic;
using ReceivableDAL;
using ReceivableEntity;

namespace ReceivableBLL
{
    public class rcv_CompanyOpeningBalanceBLL //: IDisposible
    {
        public rcv_CompanyOpeningBalanceBLL()
        {
            //rcv_CompanyOpeningBalanceDAO = rcv_CompanyOpeningBalance.GetInstanceThreadSafe;
            rcv_CompanyOpeningBalanceDAO = new rcv_CompanyOpeningBalanceDAO();
        }

        public rcv_CompanyOpeningBalanceDAO rcv_CompanyOpeningBalanceDAO { get; set; }

        public List<rcv_CompanyOpeningBalance> GetAll()
        {
            try
            {
                return rcv_CompanyOpeningBalanceDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<rcv_CompanyOpeningBalance> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return rcv_CompanyOpeningBalanceDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyOpeningBalance> CompanyOpeningBalance_GetByCompanyId(int CompanyId)
        {
            try
            {
                return rcv_CompanyOpeningBalanceDAO.CompanyOpeningBalance_GetByCompanyId(CompanyId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<rcv_CompanyOpeningBalance> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return rcv_CompanyOpeningBalanceDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(rcv_CompanyOpeningBalance rcv_CompanyOpeningBalance)
        {
            try
            {
                return rcv_CompanyOpeningBalanceDAO.Post(rcv_CompanyOpeningBalance);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //public long Add(rcv_CompanyOpeningBalance _rcv_CompanyOpeningBalance)
        //{
        //    try
        //    {
        //        return rcv_CompanyOpeningBalanceDAO.Add(_rcv_CompanyOpeningBalance);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public int Update(rcv_CompanyOpeningBalance _rcv_CompanyOpeningBalance)
        //{
        //    try
        //    {
        //        return rcv_CompanyOpeningBalanceDAO.Update(_rcv_CompanyOpeningBalance);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        //public int Delete(long openingBalanceId)
        //{
        //    try
        //    {
        //        return rcv_CompanyOpeningBalanceDAO.Delete(openingBalanceId);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
    }
}