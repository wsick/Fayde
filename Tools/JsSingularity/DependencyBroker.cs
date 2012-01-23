using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;

namespace JsSingularity
{
    public class DependencyBroker
    {
        public List<JsFile> AllJsFiles { get; set; }
        public List<JsFile> SortedJsFiles { get; set; }

        private List<JsFile> _RemainingJsFiles;

        public void ConnectDependencies()
        {
            AllJsFiles.ForEach(jf => jf.FindRefs(AllJsFiles));
        }

        public void SortDependencies()
        {
            _RemainingJsFiles = AllJsFiles.ToList();
            
            SortedJsFiles = InitialPrune().ToList();
            var tempSorted = new List<JsFile>();
            int prevCount;
            do
            {
                prevCount = tempSorted.Count;
                Debug.WriteLine("Pruning");
                tempSorted.AddRange(Prune());
            } while (_RemainingJsFiles.Count > 0 && prevCount != tempSorted.Count);
            SortedJsFiles = SortedJsFiles.Concat(tempSorted).ToList();
            if (_RemainingJsFiles.Any())
                Console.WriteLine("ERROR: Detected circular reference.");
        }

        private IEnumerable<JsFile> InitialPrune()
        {
            int i = 0;
            while (i < _RemainingJsFiles.Count)
            {
                var rjf = _RemainingJsFiles[i];
                if (rjf.HasNoDependencies)
                {
                    _RemainingJsFiles.RemoveAt(i);
                    yield return rjf;
                }
                else
                    i++;
            }
        }

        private IEnumerable<JsFile> Prune()
        {
            int i = 0;
            while (i < _RemainingJsFiles.Count)
            {
                var rjf = _RemainingJsFiles[i];
                if (JsFileHasDependencies(rjf))
                {
                    i++;
                    continue;
                }
                _RemainingJsFiles.RemoveAt(i);
                yield return rjf;
            }
        }

        private bool JsFileHasDependencies(JsFile jf)
        {
            return _RemainingJsFiles.Join(jf.JsRefs, sjf => sjf, jr => jr.InternalFile, (sjf, jr) => jr).Any();
        }

        private bool IsJsFileADependency(JsFile jf)
        {
            foreach (var rjf in _RemainingJsFiles)
            {
                foreach (var jr in rjf.JsRefs)
                {
                    if (jr.InternalFile == null) //Could not resolve, ignore
                        continue;
                    if (jf == jr.InternalFile)
                        return true;
                }
            }
            return false;
        }
    }
}
