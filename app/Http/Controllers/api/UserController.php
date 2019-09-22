<?php

namespace App\Http\Controllers\api;

use App\User;
use App\Article;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request) {
        $user = User::where('id', $request->user_id)->first();
        $articles = DB::select(DB::raw(
            "SELECT a.*,
            (SELECT COUNT(1) FROM article_likes al WHERE al.article_id = a.id) as likes,
            (SELECT COUNT(1) FROM article_comments ac WHERE ac.article_id = a.id) as commentsCount,
            (SELECT COUNT(1) FROM article_likes al WHERE al.article_id = a.id AND al.user_id = {$request->watcher_id}) as liked
            from articles a
            where a.user_id = {$request->user_id} group by a.id order by a.updated_at"));
        $data = [
            'user' => $user,
            'articles' => $articles
        ];
        return $data;
    }

    public function updateAvatar(Request $request) {
        $user = DB::table('users')->select('name')->where('id', $request->user_id)->first();
        $file = $request->file('file')->store("uploads/{$user->name}", 'public');
        DB::table('users')
            ->where('id', $request->user_id)
            ->update(['image_url' => $file]);
        return $file;
//        return $request->file->getClientMimeType();
//        $content = Storage::disk('csv')->get('file.csv');
    }
}
