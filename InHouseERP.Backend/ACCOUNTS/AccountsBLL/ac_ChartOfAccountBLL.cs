using System;
using System.Collections.Generic;
using AccountsDAL;
using AccountsEntity;

namespace AccountsBLL
{
    public class ac_ChartOfAccountBLL //: IDisposible
    {
        public ac_ChartOfAccountBLL()
        {
            //ac_ChartOfAccountDAO = ac_ChartOfAccount.GetInstanceThreadSafe;
            ac_ChartOfAccountDAO = new ac_ChartOfAccountDAO();
        }

        public ac_ChartOfAccountDAO ac_ChartOfAccountDAO { get; set; }

        public List<ac_ChartOfAccount> GetAll()
        {
            try
            {
                return ac_ChartOfAccountDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ac_ChartOfAccountDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ac_ChartOfAccount> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return ac_ChartOfAccountDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ac_ChartOfAccount _ac_ChartOfAccount)
        {
            try
            {
                return ac_ChartOfAccountDAO.Add(_ac_ChartOfAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ac_ChartOfAccount _ac_ChartOfAccount)
        {
            try
            {
                return ac_ChartOfAccountDAO.Update(_ac_ChartOfAccount);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int accountId)
        {
            try
            {
                return ac_ChartOfAccountDAO.Delete(accountId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}