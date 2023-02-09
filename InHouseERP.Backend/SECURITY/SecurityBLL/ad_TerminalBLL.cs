using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_TerminalBLL //: IDisposible
    {
        public ad_TerminalBLL()
        {
            //ad_TerminalDAO = ad_Terminal.GetInstanceThreadSafe;
            ad_TerminalDAO = new ad_TerminalDAO();
        }

        public ad_TerminalDAO ad_TerminalDAO { get; set; }

        public List<ad_Terminal> GetAll()
        {
            try
            {
                return ad_TerminalDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Terminal> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return ad_TerminalDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ad_Terminal> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return ad_TerminalDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(ad_Terminal _ad_Terminal)
        {
            try
            {
                return ad_TerminalDAO.Add(_ad_Terminal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(ad_Terminal _ad_Terminal)
        {
            try
            {
                return ad_TerminalDAO.Update(_ad_Terminal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(int TerminalId)
        {
            try
            {
                return ad_TerminalDAO.Delete(TerminalId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}