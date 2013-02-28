/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="MatchColumn.ts" />
/// <reference path="Match.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class BracketViewModel extends MVVM.ViewModelBase {
        private static ROUND_BASES = [0, 32, 48, 56, 60, 62];
        private AllMatches: Match[] = [];
        MatchColumns = new Collections.ObservableCollection();

        Load() {
            this.LoadMatches();
            this.HookupSelection();
            this.LoadTeams();
        }
        private LoadMatches() {
            this.MatchColumns = Enumerable.ToObservable(Enumerable.Range(1, 11)
                .map((i) => new MatchColumn()));
            this.AllMatches = this.CreateMatches();
            var tempMatches = this.AllMatches.slice(0);
            for (var i = 0; i < 5; i++)
            {
                var numMatches = Math.pow(2, 4 - i);
                var curCol = <MatchColumn>(this.MatchColumns.GetValueAt(i * 2));
                curCol.Matches = Enumerable.ToObservable(tempMatches.slice(0, numMatches));
                tempMatches = tempMatches.slice(numMatches);
                curCol = <MatchColumn>(this.MatchColumns.GetValueAt(i * 2 + 1));
                curCol.Matches = Enumerable.ToObservable(tempMatches.slice(0, numMatches));
                tempMatches = tempMatches.slice(numMatches);
            }
            this.MatchColumns.GetValueAt(10).Matches = Enumerable.ToObservable(tempMatches);
        }
        private HookupSelection() {
            var matches = this.AllMatches;
            var len = matches.length;
            for (var i = 0; i < len; i++) {
                var match = matches[i];
                match.PropertyChanged.Subscribe(this.match_PropertyChanged, this);
            }
        }
        private LoadTeams() {
            for (var i = 1; i <= 64; i++)
            {
                var team = new Team();
                team.Name = "",
                team.Seed = i;
                this.SetTeamAt(i, team);
            }
        }

        private CreateMatches(): Match[] {
            return Enumerable.Range(1, 63)
                .map(this.CreateMatch, this);
        }
        private CreateMatch(matchNumber: number): Match {
            var match = new Match();
            match.MatchNumber = matchNumber;
            match.Round = this.GetRoundFromMatchNumber(matchNumber);
            return match;
        }
        private GetRoundFromMatchNumber(matchNumber: number): number {
            var remainder = matchNumber;
            var round
            for (round = 0; round < 5 && remainder > 0; round++) {
                remainder -= Math.pow(2, 5 - round);
            }
            return round;
        }

        private match_PropertyChanged(sender, e) {
            if (e.PropertyName === "SelectedTeam") {
                this.AdvanceTeam(<Match>sender);
            }
        }
        private AdvanceTeam(match: Match) {
            var winnerMatch = this.GetWinnerMatch(match);
            if (winnerMatch == null)
                return;
            if (match.MatchNumber % 2 == 1) {
                if (match.SelectedTeam != winnerMatch.Team1)
                    winnerMatch.SelectedTeam = null;
                winnerMatch.Team1 = match.SelectedTeam;
            }
            else {
                if (match.SelectedTeam != winnerMatch.Team2)
                    winnerMatch.SelectedTeam = null;
                winnerMatch.Team2 = match.SelectedTeam;
            }
        }
        private GetWinnerMatch(curMatch: Match): Match {
            var roundMatchNumber = curMatch.MatchNumber - BracketViewModel.ROUND_BASES[curMatch.Round - 1];
            var nextRoundMatchNumber = Math.ceil(roundMatchNumber / 2.0);
            var nextMatchNumber = nextRoundMatchNumber + BracketViewModel.ROUND_BASES[curMatch.Round];
            return this.AllMatches.filter((m) => m.MatchNumber == nextMatchNumber, this)[0];
        }

        private GetTeamAt(position: number): Team {
            return (position % 2 == 1) ? this.GetMatchAt(position).Team1 : this.GetMatchAt(position).Team2;
        }
        private SetTeamAt(position: number, team: Team) {
            if (position % 2 == 1)
                this.GetMatchAt(position).Team1 = team;
            else
                this.GetMatchAt(position).Team2 = team;
        }
        private GetMatchAt(position: number): Match {
            var reqMatchNumber = Math.ceil(position / 2.0);
            return this.AllMatches.filter((m) => m.MatchNumber == reqMatchNumber, this)[0];
        }
    }
    Nullstone.RegisterType(BracketViewModel, "BracketViewModel", MVVM.ViewModelBase);
    Nullstone.AutoNotifyProperty(BracketViewModel, "MatchColumns");

    class Enumerable {
        static Range(start: number, count: number): number[] {
            var arr = [];
            for (var i = start; i < start + count; i++) {
                arr.push(i);
            }
            return arr;
        }
        static ToObservable(items: any[]) {
            var obs = new Collections.ObservableCollection();
            obs.AddRange(items);
            return obs;
        }
    }
}