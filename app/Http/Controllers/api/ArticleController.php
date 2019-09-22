<?php

namespace App\Http\Controllers\api;

use App\Article;
use App\ArticleLikes;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\JWTAuth;

class ArticleController extends Controller
{

    protected $auth;

    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    public function like(Request $request)
    {
        $type = $request->type;
        if ($type === 'add') {
            DB::table('article_likes')->insert(
                ['user_id' => $request->user_id, 'article_id' => $request->article_id]
            );
        } else {
            DB::table('article_likes')->where('user_id', $request->user_id)->where('article_id', $request->article_id)->delete();
        }
    }

    public function index(Request $request)
    {
        $articles = DB::select(DB::raw("SELECT a.*, COUNT(al.article_id) as likes, COUNT(u.id) as liked
            from articles a
            left join article_likes al ON a.id = al.article_id
            left join users u ON al.user_id = u.id AND u.id = {$request->user_id}
            where a.user_id = {$request->user_id} group by a.id order by a.updated_at"));

        return $articles;
    }

    public function store(Request $request) // create new article
    {
        $article = new Article();
        $article->title = $request->title;
        $article->content = $request->content;
        $article->user_id = $request->user_id;
        $article->save();
        return [
            'success' => true
        ];
    }

    public function remove(Request $request) // create new article
    {
        $article = Article::findOrFail($request->article_id);
        $article->delete();
        return [
            'success' => true
        ];
    }
}
